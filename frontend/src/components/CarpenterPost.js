const CarpenterPost = ({ post }) => {
  return (
    <div className="products_card">
      <img src={post.ImageURL} alt="myPost" className="product_img" />
      <p>Category: {post.Category}</p>
      <p>Material: {post.Category}</p>
      <p>Description: {post.Description}</p>
    </div>
  );
};

export default CarpenterPost;
