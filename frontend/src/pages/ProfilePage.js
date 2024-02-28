import profile from "../assets/profile.jpg";
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
        {userRole === "WorkshopOwner" && <div></div>}
      </div>
    </div>
  );
};

export default ProfilePage;
