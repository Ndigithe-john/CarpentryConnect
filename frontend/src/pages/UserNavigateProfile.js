import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import CarpenterPosts from "../components/CarpenterPosts";
import profile from "../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import Location from "../components/Location/Location";

const UserNavigateProfile = ({ userRole, setChatRoomId, joinRoom }) => {
  const { UserId } = useParams();
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        let apiURL = `http://localhost:4050/users/getUser/${UserId}`;
        const response = await axios.get(apiURL);
        setUserProfile(response.data.data[0]);
      } catch (error) {}
    }
    getUser();
  }, [UserId]);

  const handleChatButtonClick = async () => {
    try {
      let apiURL = `http://localhost:4050/users/createChatRoom`;
      const response = await axios.post(
        apiURL,
        { Participant2ID: UserId },
        { withCredentials: true }
      );
      const { status, data } = response.data;
      joinRoom();
      if (status) {
        setChatRoomId(data.ChatRoomID);
      } else {
        console.error("Error creating chat room");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar
        element={<h5>WoodCraft Masters</h5>}
        className="landing_nav fixed_nav prof_nav"
      >
        <div className="added_profile">
          <div className="profile_photo">
            <img src={profile} alt="profilePhoto" className="prof_image" />
          </div>
          <div className="profile_name">
            <p style={{ color: "wheat" }}>{userProfile.FullName}</p>
          </div>
        </div>
      </NavBar>

      <div className="profile_page_user">
        <div className="profile_page_aside">
          <h3>{userProfile.FullName}</h3>
          <div className="prof_pic_div">
            <img src={profile} alt="profile_photo" />
          </div>
          <Link to={`/user/${UserId}/chat`} onClick={handleChatButtonClick}>
            <button className="chat_button">Chat {userProfile.FullName}</button>
          </Link>
        </div>
        <div className="right_side_profile">
          <h1>Full Name</h1>
          <h4>{userProfile.FullName}</h4>
          <h1>Email Address</h1>
          <h4>{userProfile.Email}</h4>
          <h1>Bio</h1>
          <h4>{userProfile.About}</h4>
          {userRole === "WorkshopOwner" && (
            <>
              <h1>Qualification Level</h1>
              <h4>{userProfile.QualificationLevel}</h4>
              <h1>Qualification Document</h1>
              <h4>{userProfile.QualificationDocument}</h4>
            </>
          )}
        </div>
        {userRole === "Carpenter" && (
          <div className="workshop_owner_profile">
            <h1>Workshop Name</h1>
            <h4>{userProfile.WorkshopLocation}</h4>
            <h1>Workshop Location</h1>
            <h4>
              <FontAwesomeIcon icon={faLocation} /> location
            </h4>
            <div style={{ width: "40vw", height: "50vh" }}>
              <Location
                Latitude={userProfile.Latitude}
                Longitude={userProfile.Longitude}
              />
            </div>
          </div>
        )}
      </div>

      {userRole === "WorkshopOwner" && (
        <div className="personal_posts_container">
          <h1 className="personal_posts">{userProfile.FullName} Posts</h1>
          <CarpenterPosts />
        </div>
      )}
    </div>
  );
};

export default UserNavigateProfile;
