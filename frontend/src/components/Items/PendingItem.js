const PendingItem = ({ item }) => {
  return (
    <div>
      <img src={item.ImageURL} alt="pendingImage" />
    </div>
  );
};

export default PendingItem;
