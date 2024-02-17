import Data from "../Data/Data";
import PendingItem from "./PendingItem";
const Approved = () => {
  <div className="pending_container">
    {Data.map((item) => (
      <PendingItem item={item} />
    ))}
  </div>;
};

export default Approved;
