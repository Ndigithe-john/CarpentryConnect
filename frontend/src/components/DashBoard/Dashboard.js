import NavBar from "../NavBar";
import DashBoardAside from "./DashBoardAside";
import profile from "../../assets/profile.jpg";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="container_dashboard">
      <NavBar element={<h5>WoodCraft Masters</h5>} className="landing_nav">
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
        <DashBoardAside />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
