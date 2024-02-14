import { useState } from "react";
import NavBar from "./NavBar";

import profile from "../assets/profile.jpg";

const Dashboard = () => {
  const [openItems, setOpenItems] = useState(false);
  function handleOpenItems() {
    setOpenItems((prevState) => !prevState);
  }
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
            <h3 onClick={handleOpenItems}>Items</h3>
            {openItems && (
              <div className="items_properties">
                <h5>Add Item</h5>
                <h5>Pending</h5>
                <h5>Completed</h5>
              </div>
            )}
          </div>
        </div>
        <div className="dashboard_main_container"></div>
      </div>
    </div>
  );
};

export default Dashboard;
