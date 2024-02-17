import logo from "../assets/logo.jpg";
const NavBar = ({ children, element, className = "" }) => {
  return (
    <div className={className}>
      <img src={logo} alt="logo" />
      {element}
      <div className="landing_buttons">{children}</div>
    </div>
  );
};

export default NavBar;
