const CarpenterPost = ({ post }) => {
  return (
    <div className="carpenter_post">
      <img src={post.ImageURL} alt="myPost" />
    </div>
  );
};

export default CarpenterPost;
