import { useState, useEffect } from "react";
import axios from "axios";
import ApprovedItem from "./ApprovedItem";

const Approved = ({ userRole }) => {
  const [approvedItems, setApprovedItems] = useState([]);

  useEffect(() => {
    const fetchApprovedItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/users/workshopApproved",
          { withCredentials: true }
        );
        setApprovedItems(response.data.data);
      } catch (error) {
        console.error("Error fetching approved items:", error.message);
      }
    };

    fetchApprovedItems();
  }, []);

  return (
    <div className="pending_container">
      {approvedItems.map((item) => (
        <ApprovedItem key={item.ItemID} item={item} />
      ))}
    </div>
  );
};

export default Approved;
