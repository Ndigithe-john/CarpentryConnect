import logo from "../assets/logo.jpg";
const NavBar = ({ children }) => {
  return (
    <div className="landing_nav">
      <img src={logo} alt="logo" />
      <h5>WoodCraft Masters</h5>
      <div className="landing_buttons">{children}</div>
    </div>
  );
};

export default NavBar;
