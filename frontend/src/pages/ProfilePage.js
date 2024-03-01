import { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import "./pages.css";
import Location from "../components/Location/Location";

import NavBar from "../components/NavBar";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
const ProfilePage = ({ userRole }) => {
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    async function getUser() {
      try {
        let apiURL = "http://localhost:4050/users/userProfile";
        const response = await axios.get(apiURL, { withCredentials: true });
        setUserProfile(response.data.data[0]);
      } catch (error) {}
    }
    getUser();
  }, []);

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
            <p>name</p>
          </div>
        </div>
      </NavBar>
      <div className="profile_page">
        <div className="profile_page_aside">
          <h3> My Profile</h3>
          <div className="prof_pic_div">
            <img src={profile} alt="profile_photo" />
          </div>
          <Link to="/profile/editProfile">
            <button className="profile_page_edit_button">Edit Profile</button>
          </Link>
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
            <div
              style={{ border: "2px solid red", width: "40vw", height: "50vh" }}
            >
              <Location
                Latitude={userProfile.Latitude}
                Longitude={userProfile.Longitude}
              />
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
