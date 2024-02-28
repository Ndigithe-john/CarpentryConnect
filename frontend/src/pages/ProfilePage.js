import profile from "../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import "./pages.css";

import NavBar from "../components/NavBar";
const ProfilePage = ({ userRole }) => {
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
          <button>Edit Profile</button>
        </div>
        <div className="right_side_profile">
          <h1>Full Name</h1>
          <h4>Name comes here</h4>
          <h1>Email Address</h1>
          <h4>Email comes here</h4>
          <h1>Bio</h1>
          <h4>bio</h4>
        </div>
        {userRole === "WorkshopOwner" && (
          <div className="workshop_owner_profile">
            <h1>Workshop Name</h1>
            <h4>workshop Name</h4>
            <h1>Workshop Location</h1>
            <h4>
              <FontAwesomeIcon icon={faLocation} /> location
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
