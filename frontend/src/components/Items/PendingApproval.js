import { useState, useEffect } from "react";
import axios from "axios";
import PendingItem from "./PendingItem";

const PendingApproval = ({ userRole }) => {
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        let apiUrl = "http://localhost:5050/users/workshopPending";

        if (userRole === "Carpenter") {
          apiUrl = "http://localhost:5050/users/carpenterPending";
        }

        const response = await axios.get(apiUrl, { withCredentials: true });
        console.log(response);
        setPendingItems(response.data.data);
      } catch (error) {
        console.error("Error fetching pending items:", error.message);
      }
    };

    fetchPendingItems();
  }, [userRole]);

  return (
    <div className="pending_container">
      {pendingItems.map((item) => (
        <PendingItem key={item.ItemID} item={item} />
      ))}
    </div>
  );
};

export default PendingApproval;
