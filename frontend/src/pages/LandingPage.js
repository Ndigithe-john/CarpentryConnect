import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import backgroundImg from "../assets/background.jpg";

import "./pages.css";

const LandingPage = () => {
  return (
    <div className="landing_page">
      <NavBar element={<h5>WoodCraft Masters</h5>}>
        <div className="childrens">
          <Link to="/login">
            <button className="landing_button">login</button>
          </Link>
          <Link to="/signup">
            <button className="landing_button">signup</button>
          </Link>
        </div>
      </NavBar>
      <p className="landing_about">
        Providing Quality construction Within private and public sector
      </p>
      <div className="background-container">
        <img src={backgroundImg} alt="background" />
        <p>
          We are carpenters, our skill known to all across the land. With an
          impeccable reputation, we have built a stellar name for ourselves and
          a portfolio of work that can be found far and wide. Using only the
          best wood and materials, we take great care to craft every piece we
          make with exacting attention to detail. From small ornate pieces like
          jewellery boxes, to massive pieces of furniture, each item is crafted
          to meet our customer's needs. We pride ourselves in making sure our
          clients receive the highest quality items available
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
