import axios from "axios";
import { useEffect, useState } from "react";
import CarpenterPost from "./CarpenterPost";
const CarpenterPosts = () => {
  const [myPersonalPosts, setMyPersonalPosts] = useState([]);
  useEffect(() => {
    async function getMyPosts() {
      try {
        let apiURL = "http://localhost:5050/users/userItems";
        const response = await axios.get(apiURL, { withCredentials: true });

        setMyPersonalPosts(response.data.data);
      } catch (error) {}
    }
    getMyPosts();
  }, []);
  return (
    <div>
      {myPersonalPosts.map((post) => (
        <CarpenterPost key={post.ItemID} post={post} />
      ))}
    </div>
  );
};

export default CarpenterPosts;
