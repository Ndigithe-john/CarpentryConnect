import { useState, useEffect } from "react";
import axios from "axios";
import RejectedItem from "./RejectedItem";
const Rejected = ({ userRole }) => {
  const [rejectedItems, setRejectedItems] = useState([]);

  useEffect(() => {
    const fetchRejectedItems = async () => {
      try {
        let apiURL = "http://localhost:5050/users/workshopRejected";
        if (userRole === "Carpenter") {
          apiURL = "http://localhost:5050/users/carpenterRejected";
        }
        const response = await axios.get(apiURL, { withCredentials: true });
        console.log(response + apiURL);

        setRejectedItems(response.data.data);
      } catch (error) {
        console.log("Error fetching rejected items:", error.message);
      }
    };
    fetchRejectedItems();
  }, [userRole]);
  return (
    <div className="pending_container">
      {rejectedItems.map((item) => (
        <RejectedItem item={item} key={item.ItemID} />
      ))}
    </div>
  );
};

export default Rejected;
