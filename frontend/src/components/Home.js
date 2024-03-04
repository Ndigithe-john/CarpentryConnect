import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import profile from "../assets/profile.jpg";
import SearchBar from "./SearchBar";
import Products from "./Products";
import AccountAboutModal from "./AccountAboutModal";
import DisplayContainer from "../TopProduct/DisplayContainer";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ userRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInformation, setUserInformation] = useState("");
  function hanldeMouseEnter() {
    setIsModalOpen((prev) => !prev);
  }
  useEffect(() => {
    async function getUser() {
      try {
        let apiURL = "http://localhost:4050/users/userProfile";
        const response = await axios.get(apiURL, { withCredentials: true });
        setUserInformation(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching userName", error.message);
      }
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
            <p style={{ color: "wheat" }}>{userInformation.FullName}</p>
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
