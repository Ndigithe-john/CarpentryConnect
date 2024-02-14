import NavBar from "./NavBar";

import profile from "../assets/profile.jpg";
const Dashboard = () => {
  return (
    <div className="container_dashboard">
      <NavBar element={<h5>WoodCraft Masters</h5>}>
        <div className="added_profile">
          <div className="profile_photo">
            <img src={profile} alt="profilePhoto" />
          </div>
          <div className="profile_name">
            <p>name</p>
          </div>
        </div>
      </NavBar>
      <div className=" dashboard_container">
        <div className="dashboard_aside_container">
          <h1>Dashboard</h1>
          <div className="about_items">
            <h5>Items</h5>
          </div>
        </div>
        <div className="dashboard_main_container"></div>
      </div>
    </div>
  );
};

export default Dashboard;
