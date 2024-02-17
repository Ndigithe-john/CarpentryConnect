import { useState } from "react";
import { Link } from "react-router-dom";
const DashBoardAside = () => {
  const [openItems, setOpenItems] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  function handleOpenItems() {
    setOpenItems((prevState) => !prevState);
  }
  function handleOpenOrders() {
    setOpenOrders((prev) => !prev);
  }
  return (
    <div className="dashboard_aside_container">
      <h1>
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#717c87",
          }}
        >
          Dashboard
        </Link>
      </h1>
      <div className="about_items">
        <h3 onClick={handleOpenItems}>Items</h3>
        {openItems && (
          <div className="items_properties">
            <h5>
              <Link to="/dashboard/addItem">add Item</Link>
            </h5>
            <h5>
              <Link to="/dashboard/items">Items</Link>
            </h5>
          </div>
        )}
      </div>
      <div className="about_orders">
        <h3 onClick={handleOpenOrders}>Orders</h3>
        {openOrders && (
          <div className="items_properties">
            <h5>
              <Link to="/dashboard/pendingapproval">Pending Approval</Link>
            </h5>
            <h5>
              <Link to="/dashboard/approved">Approved</Link>
            </h5>
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
  );
};

export default DashBoardAside;
