import NavBar from "../NavBar";
import DashBoardAside from "./DashBoardAside";
import profile from "../../assets/profile.jpg";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ userRole }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function getUserName() {
      let apiURL = "http://localhost:4050/users/userProfile";
      const response = await axios.get(apiURL, { withCredentials: true });
      setUserName(response.data.data[0]);
    }
    getUserName();
  }, []);
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
            <p style={{ color: "wheat" }}>{userName.FullName}</p>
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
