import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AccountAboutModal = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const response = await axios.delete(
        `http://localhost:4050/users/logout`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Logged out successfully");
        navigate("/");
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        setError("An unexpected error occurred during logout.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setError("An error occurred during logout. Please try again.");
    }
  }

  return (
    <div className="account-modal">
      <div className="account-modal-content">
        <h4>
          <Link to="/account">Account</Link>
        </h4>
        <h4>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
        </h4>
        <h4 onClick={handleLogout}>logout</h4>
      </div>
    </div>
  );
};

export default AccountAboutModal;
