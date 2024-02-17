import AboutItem from "./AboutItem";

const PendingItem = ({ item }) => {
  return (
    <AboutItem item={item}>
      <div className="pending_approval_buttons">
        <button>reject</button>
        <button>Approve</button>
      </div>
    </AboutItem>
  );
};

export default PendingItem;
