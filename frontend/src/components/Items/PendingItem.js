const PendingItem = ({ item }) => {
  return (
    <div className="pending_container_item">
      <div className="image_container_div">
        <img src={item.ImageURL} alt="pendingImage" className="item_image" />
      </div>
      <div className="item_description">
        <h1>About Item</h1>
        <h4>Item Description: {item.Description}</h4>
        <h4>Item Category: {item.Category}</h4>
        <h4>Item Material: {item.Material}</h4>
        <h4>Date Required: {item.DateRequired}</h4>
        <h4>Item Price:{item.Price}</h4>
      </div>
      <div className="capentryDetails">
        <h1>Capenter Details</h1>
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
