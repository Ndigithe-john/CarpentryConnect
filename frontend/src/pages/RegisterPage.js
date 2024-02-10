import { Link } from "react-router-dom";
import "./pages.css";
import NavBar from "../components/NavBar";
import { useState } from "react";
const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState(null);
  const [role, setRole] = useState("Carpenter");
  const [qualification, setQualification] = useState("");
  const [qualificationDocument, setQualificationDocument] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [workshopLocation, setWorkshopLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function handleSignUp(e) {
    e.preventDefault();
  }
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
        <form className="register_form" onSubmit={handleSignUp}>
          <p>Register Form </p>
          <input
            placeholder="FirstName"
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="LastName"
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="PhoneNumber"
            type="number"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(Number(e.target.value))}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Carpenter</option>
            <option>WorkshopOwner</option>
          </select>
          {role === "Carpenter" ? (
            <>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              >
                <option>Diploma in Capentry and Renovation</option>
                <option>Level 2 Diploma in Site Capentry</option>
                <option>Level 3 Diploma in site Capentry</option>
                <option>Cetificate in Capentry</option>
              </select>
              <input
                type="file"
                value={qualificationDocument}
                onChange={(e) => setQualificationDocument(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                placeholder="WorkshopName"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
              />
              <input
                placeholder="location"
                value={workshopLocation}
                onChange={(e) => setWorkshopLocation(e.target.value)}
              />
            </>
          )}

          <input
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
