import logo from "../assets/logo.jpg";
const NavBar = ({ children, element }) => {
  return (
    <div className="landing_nav">
      <img src={logo} alt="logo" />
      {element}
      <div className="landing_buttons">{children}</div>
    </div>
  );
};

export default NavBar;
