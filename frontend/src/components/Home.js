import { useState } from "react";
import NavBar from "./NavBar";
import profile from "../assets/profile.jpg";
import SearchBar from "./SearchBar";
import Products from "./Products";
import AccountAboutModal from "./AccountAboutModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function hanldeMouseEnter() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <>
      <NavBar element={<SearchBar />}>
        <div className="added_profile">
          <div className="profile_photo">
            <img src={profile} alt="profilePhoto" />
          </div>
          <div className="profile_name">
            <p>name</p>
          </div>
        </div>
        <div className="navbar_hamburger" onMouseEnter={hanldeMouseEnter}>
          <div className="menu-icon">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </NavBar>
      {isModalOpen && <AccountAboutModal />}
      <Products />
    </>
  );
};

export default Home;
