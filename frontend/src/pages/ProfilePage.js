import profile from "../assets/profile.jpg";
import NavBar from "../components/NavBar";
const ProfilePage = () => {
  return (
    <div>
      <NavBar
        element={<h5>WoodCraft Masters</h5>}
        className="landing_nav fixed_nav"
      >
        {" "}
        <div className="added_profile">
          <div className="profile_photo">
            <img src={profile} alt="profilePhoto" />
          </div>
          <div className="profile_name">
            <p>name</p>
          </div>
        </div>
      </NavBar>
    </div>
  );
};

export default ProfilePage;
