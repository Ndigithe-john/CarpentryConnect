import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Axios from "axios";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    const userData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await Axios.post(
        `http://localhost:4050/users/login`,
        userData,
        { withCredentials: true } // Include credentials in the request
      );

      if (response.status === 200) {
        console.log("Logged in successfully");
        navigate("/home");
      } else {
        console.error("Login failed");
        setError("Login failed. Please check your details and try again.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    }
  }

  return (
    <div>
      <NavBar element={<h5>WoodCraft Masters</h5>} className="landing_nav">
        <Link to="/signup">
          <button className="landing_button">signup</button>
        </Link>
      </NavBar>
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
        <form className="register_form" onSubmit={handleLogin}>
          <p>Login Form</p>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerform_button" type="submit">
            Login
          </button>
          <p>
            Don't have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
