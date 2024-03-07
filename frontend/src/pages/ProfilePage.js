import { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import "./pages.css";
import Location from "../components/Location/Location";
import ProfileModal from "../components/ProfileModal";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import PersonalPosts from "../components/PersonalPosts";
const ProfilePage = ({ userRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  function hanldeMouseEnter() {
    setIsModalOpen((prev) => !prev);
  }
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    async function getUser() {
      try {
        let apiURL = "http://localhost:4050/users/userProfile";
        const response = await axios.get(apiURL, { withCredentials: true });
        setUserProfile(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getMyPosts() {
      try {
        const apiURL = "http://localhost:5050/users/userItems";
        const response = await axios.get(apiURL, { withCredentials: true });
        setMyPosts(response.data.data);
        console.log(myPosts);
      } catch (error) {
        console.log(error);
      }
    }
    getMyPosts();
  }, []);

  return (
    <div>
      <NavBar
        element={<h5>WoodCraft Masters</h5>}
        className="landing_nav fixed_nav prof_nav"
      >
        <div className="added_profile">
          <div className="navbar_hamburger" onMouseEnter={hanldeMouseEnter}>
            <div className="menu-icon">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </NavBar>
      {isModalOpen && <ProfileModal />}
      <div className="profile_page">
        <div className="profile_page_aside">
          <h3>{userProfile.FullName}</h3>
          <div className="prof_pic_div">
            <img src={profile} alt="profile_photo" />
          </div>
          <button className="profile_page_edit_button">Update Photo</button>
        </div>
        <div className="right_side_profile">
          <h1>Full Name</h1>
          <h4>{userProfile.FullName}</h4>
          <h1>Email Address</h1>
          <h4>{userProfile.Email}</h4>
          <h1>Bio</h1>
          <h4>{userProfile.About}</h4>
          {userRole === "Carpenter" && (
            <>
              <h1>QualificationLevel</h1>
              <h4>{userProfile.QualificationLevel}</h4>
              <h1>qualificationDocument</h1>
              <h4>{userProfile.QualificationDocument}</h4>
            </>
          )}
        </div>
        {userRole === "WorkshopOwner" && (
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
        <Outlet />
      </div>

      {userRole === "Carpenter" && (
        <div className="personal_posts_container">
          <h1 className="personal_posts">Posts</h1>
          <div className="products">
            {myPosts.map((post) => (
              <PersonalPosts key={post.ItemID} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
