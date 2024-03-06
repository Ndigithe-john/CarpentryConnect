import { Link } from "react-router-dom";

const CarpenterPost = ({ post }) => {
  return (
    <div className="products_card">
      <Link to={`/item/${post.ItemID}`}>
        <img src={post.ImageURL} alt="myPost" className="product_img" />
      </Link>

      <p>Category: {post.Category}</p>
      <p>Material: {post.Category}</p>
      <p>Description: {post.Description}</p>
    </div>
  );
};

export default CarpenterPost;
