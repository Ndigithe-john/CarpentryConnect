import NavBar from "./NavBar";
import profile from "../assets/profile.jpg";
import SearchBar from "./SearchBar";
const Home = () => {
  return (
    <div>
      <NavBar element={<SearchBar />}>
        <div className="profile_photo">
          <img src={profile} alt="profilePhoto" />
        </div>
      </NavBar>
    </div>
  );
};

export default Home;
