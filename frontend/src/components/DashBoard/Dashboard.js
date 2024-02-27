import NavBar from "../NavBar";
import DashBoardAside from "./DashBoardAside";
import profile from "../../assets/profile.jpg";
import { Outlet, Link } from "react-router-dom";

const Dashboard = ({ userRole }) => {
  return (
    <div className="container_dashboard">
      <NavBar
        element={<h5>WoodCraft Masters</h5>}
        className="landing_nav fixed_nav"
      >
        <div className="added_profile">
          <div className="profile_photo">
            <Link to="/profile">
              <img src={profile} alt="profilePhoto" />
            </Link>
          </div>
          <div className="profile_name">
            <p>name</p>
          </div>
        </div>
      </NavBar>
      <div className=" dashboard_container">
        <DashBoardAside userRole={userRole} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
