import Data from "../Data/Data";
import RejectedItem from "./RejectedItem";
const Rejected = () => {
  return (
    <div className="pending_container">
      {Data.map((item) => (
        <RejectedItem item={item} />
      ))}
    </div>
  );
};

export default Rejected;
