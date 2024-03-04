import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import profile from "../assets/profile.jpg";
import SearchBar from "./SearchBar";
import Products from "./Products";
import AccountAboutModal from "./AccountAboutModal";
import DisplayContainer from "../TopProduct/DisplayContainer";
import { Link } from "react-router-dom";

const Home = ({ userRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState([]);
  function hanldeMouseEnter() {
    setIsModalOpen((prev) => !prev);
  }
  useEffect(() => {
    async function getUser() {
      let apiURL = "http://localhost5050:/";
    }
    getUser();
  }, []);

  return (
    <>
      <NavBar
        element={<SearchBar />}
        className="landing_nav fixed_nav home_nav"
      >
        <div className="added_profile">
          <div className="profile_photo">
            <Link to="/profile">
              <img src={profile} alt="profilePhoto" />
            </Link>
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

      <DisplayContainer />
      {userRole === "Carpenter" ? (
        <h3 className="job_listing">Job Listing</h3>
      ) : (
        <h3 className="job_listing">Carpenters Posts</h3>
      )}

      <Products userRole={userRole} />
    </>
  );
};

export default Home;
