import { useState, useEffect } from "react";
import axios from "axios";
import PendingItem from "./PendingItem";

const PendingApproval = () => {
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/users/workshopPending",
          { withCredentials: true }
        );
        console.log(response);
        setPendingItems(response.data.data);
      } catch (error) {
        console.error("Error fetching pending items:", error.message);
      }
    };

    fetchPendingItems();
  }, []);

  return (
    <div className="pending_container">
      {pendingItems.map((item) => (
        <PendingItem key={item.ItemID} item={item} />
      ))}
    </div>
  );
};

export default PendingApproval;
