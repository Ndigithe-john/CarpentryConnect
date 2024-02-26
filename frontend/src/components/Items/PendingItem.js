import { useState } from "react";
import axios from "axios";
import AboutItem from "./AboutItem";

const PendingItem = ({ item, userRole }) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

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

  const handleReject = async () => {
    try {
      await axios.post(
        "http://localhost:5050/users/rejectJobRequest",
        { RequestID: item.RequestID },
        { withCredentials: true }
      );
      setIsRejected(true);
    } catch (error) {
      console.error("Error rejecting job request:", error.message);
    }
  };

  return (
    <>
      <AboutItem item={item}>
        {!isApproved && !isRejected && userRole !== "Carpenter" && (
          <div className="pending_approval_buttons">
            <button onClick={handleReject} style={{ cursor: "pointer" }}>
              Reject
            </button>
            <button onClick={handleApprove} style={{ cursor: "pointer" }}>
              Approve
            </button>
          </div>
        )}
      </AboutItem>
    </>
  );
};

export default PendingItem;
