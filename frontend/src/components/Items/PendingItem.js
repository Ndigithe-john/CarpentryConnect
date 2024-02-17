const PendingItem = ({ item }) => {
  return (
    <div className="pending_container_item">
      <img src={item.ImageURL} alt="pendingImage" className="item_image" />
      <div className="item_description">
        <p>Item Description: {item.Description}</p>
      </div>
      <div className="capentryDetails">
        <p>CapenterID:</p>
        <p>CapenterName;</p>
        <p>Qualification</p>
        <div>
          <button>reject</button>
          <button>Approve</button>
        </div>
      </div>
    </div>
  );
};

export default PendingItem;
