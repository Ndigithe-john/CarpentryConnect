import NavBar from "./NavBar";
import profile from "../assets/profile.jpg";
import SearchBar from "./SearchBar";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <NavBar element={<SearchBar />}>
        <div className="added_profile">
          <div className="profile_photo">
            <img src={profile} alt="profilePhoto" />
          </div>
          <div className="profile_name">
            <p>name</p>
          </div>
        </div>
        <div className="navbar_hamburger">
          <div className="menu-icon">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </NavBar>
      <Products />
    </div>
  );
};

export default Home;
