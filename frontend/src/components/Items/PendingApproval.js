import Data from "../Data/Data";
import PendingItem from "./PendingItem";
const PendingApproval = () => {
  return (
    <div>
      {Data.map((item) => (
        <PendingItem item={item} />
      ))}
    </div>
  );
};

export default PendingApproval;
