import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div>
      <div className="landing_nav">
        <img src={logo} alt="logo" />
        <h5>WoodCraft Masters</h5>
        <div className="landing_buttons">
          <Link to="/signup">
            <button className="landing_button">signup</button>
          </Link>
        </div>
      </div>
      <div className="register_display">
        <div className="paragraph">
          <h1>Welcome back to WoodCraft Masters! 🌳</h1>
          <p>
            If you've already registered, please log in below. If you're a new
            user, make sure you've completed the registration process and
            verified your email address. Haven't registered yet? Click the 'Sign
            Up' button to get started. For those who've completed registration,
            enter your credentials, and let's continue crafting together! 🛠️💡
          </p>
        </div>
        <form className="register_form">
          <p>Login Form </p>

          <input placeholder="Email" />
          <input placeholder="Password" />
          <button>submit</button>

          <p>
            Don't have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              {" "}
              signup{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
