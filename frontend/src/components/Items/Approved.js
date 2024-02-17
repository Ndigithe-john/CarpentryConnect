import Data from "../Data/Data";
import ApprovedItem from "./ApprovedItem";
const Approved = () => {
  return (
    <div className="pending_container">
      {Data.map((item) => (
        <ApprovedItem item={item} />
      ))}
    </div>
  );
};

export default Approved;
