import { useState } from "react";
import NavBar from "./NavBar";

import profile from "../assets/profile.jpg";
import DashBoardContainer from "./DashBoardContainer";
const Dashboard = () => {
  const [openItems, setOpenItems] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  function handleOpenItems() {
    setOpenItems((prevState) => !prevState);
  }
  function handleOpenOrders() {
    setOpenOrders((prev) => !prev);
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
          <div className="about_orders">
            <h3 onClick={handleOpenOrders}>Orders</h3>
            {openOrders && (
              <div className="items_properties">
                <h5>Pending Approval</h5>
                <h5>Approved</h5>
              </div>
            )}
          </div>
          <div className="about_orders">
            <h3>Carpenters</h3>
          </div>
          <div className="about_orders">
            <h3>Reviews</h3>
          </div>
        </div>
        <div className="dashboard_main_container">
          <div className="top_dashboard_main_container">
            <h1>Dashboard</h1>
            <DashBoardContainer>Total Amount</DashBoardContainer>
          </div>
          <div className="down_dashboard_main_container">
            <DashBoardContainer className="dashboard_div_container dashbaord_main_one">
              Items
            </DashBoardContainer>
            <DashBoardContainer className="dashboard_div_container dashbaord_main_two">
              Orders
            </DashBoardContainer>
            <DashBoardContainer className="dashboard_div_container dashbaord_main_three">
              Carpenters
            </DashBoardContainer>
            <DashBoardContainer className="dashboard_div_container dashbaord_main_four">
              Reviews
            </DashBoardContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
