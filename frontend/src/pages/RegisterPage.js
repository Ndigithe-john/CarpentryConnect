import { Link } from "react-router-dom";
import "./pages.css";
import NavBar from "../components/NavBar";
const RegisterPage = () => {
  return (
    <div className="register_form_container">
      <NavBar element={<h5>WoodCraft Masters</h5>}>
        <Link to="/login">
          <button className="landing_button">login</button>
        </Link>
      </NavBar>
      <div className="register_display">
        <div className="paragraph">
          <h1>Thank you for choosing WoodCraft Masters! 🌟</h1>
          <p>
            To complete your registration, please enter your details below.
            After submission, you will receive a verification message at the
            provided email address. Once verified, you can proceed to log in and
            explore the world of woodworking opportunities. We look forward to
            having you as a part of our community! 🛠️✨
          </p>
        </div>
        <form className="register_form">
          <p>Register Form </p>
          <input placeholder="FirstName" />
          <input placeholder="LastName" />
          <input placeholder="Email" />
          <input placeholder="PhoneNumber" />
          <select>
            <option>Carpenter</option>
            <option>WorkshopOwner</option>
          </select>
          <select>
            <option>Diploma in Capentry and Renovation</option>
            <option>Level 2 Diploma in Site Capentry</option>
            <option>Level 3 Diploma in site Capentry</option>
            <option>Cetificate in Capentry</option>
          </select>
          <input type="file" />
          <input placeholder="WorkshopName" />
          <input placeholder="location" />
          <input placeholder="password" />
          <input placeholder="confirm password" />
          <button>submit</button>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              login
            </Link>
            to proceed
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

// FirstName NVARCHAR(50) NOT NULL,
// LastName NVARCHAR(50) NOT NULL,
// Email NVARCHAR(255) NOT NULL UNIQUE,
// PhoneNumber NVARCHAR(20),
// Role NVARCHAR(50) NOT NULL,
// Status NVARCHAR(50) DEFAULT 'Waiting' NOT NULL,
// QualificationLevel NVARCHAR(50),
// DocumentPath NVARCHAR(255),
// WorkshopName NVARCHAR(255),
// WorkshopLocation NVARCHAR(255),
// PasswordHash NVARCHAR(255) NOT NULL
