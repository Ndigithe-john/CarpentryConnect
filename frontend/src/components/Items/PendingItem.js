import { useState } from "react";
import axios from "axios";
import AboutItem from "./AboutItem";

const PendingItem = ({ item }) => {
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = async () => {
    try {
      await axios.post(
        "http://localhost:5050/users/approveJobRequest",
        { RequestID: item.RequestID },
        { withCredentials: true }
      );
      setIsApproved(true);
    } catch (error) {
      console.error("Error approving job request:", error.message);
    }
  };

  return (
    <AboutItem item={item}>
      {isApproved ? (
        <p className="approval_status">Job Request Approved</p>
      ) : (
        <div className="pending_approval_buttons">
          <button style={{ cursor: "pointer" }}>reject</button>
          <button onClick={handleApprove} style={{ cursor: "pointer" }}>
            Approve
          </button>
        </div>
      )}
    </AboutItem>
  );
};

export default PendingItem;
