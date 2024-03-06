import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CarpenterPost from "./CarpenterPost";

const CarpenterPosts = () => {
  const { UserId } = useParams();
  const [myPersonalPosts, setMyPersonalPosts] = useState([]);

  useEffect(() => {
    async function getMyPosts() {
      try {
        let apiURL = `http://localhost:5050/users/carpenterPosts/${UserId}`;
        const response = await axios.get(apiURL, { withCredentials: true });

        setMyPersonalPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching Carpenter posts:", error);
      }
    }

    getMyPosts();
  }, [UserId]);

  return (
    <div className="products">
      {myPersonalPosts.map((post) => (
        <CarpenterPost key={post.ItemID} post={post} />
      ))}
    </div>
  );
};

export default CarpenterPosts;
