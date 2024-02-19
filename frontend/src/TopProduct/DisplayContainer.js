import Category from "./Category";
import MainHeader from "./MainHeader";
import RightSide from "./RightSide";
import "./container.css";
const DisplayContainer = () => {
  return (
    <div className="home_main_top_container">
      <Category />
      <MainHeader />
      <RightSide />
    </div>
  );
};

export default DisplayContainer;
