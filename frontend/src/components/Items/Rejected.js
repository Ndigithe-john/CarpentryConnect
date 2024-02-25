import { useState, useEffect } from "react";
import axios from "axios";
import RejectedItem from "./RejectedItem";
const Rejected = () => {
  const [rejectedItems, setRejectedItems] = useState([]);

  useEffect(() => {
    const fetchRejectedItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/users/workshopRejected",
          { withCredentials: true }
        );

        setRejectedItems(response.data.data);
      } catch (error) {
        console.log("Error fetching rejected items:", error.message);
      }
    };
    fetchRejectedItems();
  }, []);
  return (
    <div className="pending_container">
      {rejectedItems.map((item) => (
        <RejectedItem item={item} key={item.ItemID} />
      ))}
    </div>
  );
};

export default Rejected;
