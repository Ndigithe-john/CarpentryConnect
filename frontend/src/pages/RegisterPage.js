import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import Maps from "../components/Map/Maps";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState(null);
  const [role, setRole] = useState("Carpenter");
  const [qualification, setQualification] = useState("");
  const [qualificationDocument, setQualificationDocument] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workshopLocation, setWorkshopLocation] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phonenumber ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Your existing userData object
    const userData = {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      PhoneNumber: phonenumber,
      Role: role,
      QualificationLevel: role === "Carpenter" ? qualification : "NULL",
      DocumentPath: role === "Carpenter" ? qualificationDocument : "NULL",
      WorkshopName: role === "WorkshopOwner" ? workshopName : "NULL",
      WorkshopLocation:
        role === "WorkshopOwner" ? workshopLocation.placeName : "NULL",
      PasswordHash: password,
      Confirm_password: confirmPassword,
      Latitude: workshopLocation.latitude,
      Longitude: workshopLocation.longitude,
    };

    try {
      const response = await axios.post(
        "http://localhost:4050/users/signup",
        userData
      );

      if (response.status === 200) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed");
        setError(
          "Registration failed. Please check your details and try again."
        );
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      setError("Error during registration. Please try again later.");
    }
  };

  return (
    <div className="register_form_container">
      <NavBar element={<h5>WoodCraft Masters</h5>} className="landing_nav">
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
            className={error && !firstname ? "error" : ""}
          />
          <input
            placeholder="LastName"
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className={error && !lastname ? "error" : ""}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error && !email ? "error" : ""}
          />
          <input
            placeholder="PhoneNumber"
            type="text"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(Number(e.target.value))}
            className={error && !phonenumber ? "error" : ""}
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
                className={error && !qualification ? "error" : ""}
              >
                <option>Diploma in Capentry and Renovation</option>
                <option>Level 2 Diploma in Site Capentry</option>
                <option>Level 3 Diploma in site Capentry</option>
                <option>Certificate in Capentry</option>
              </select>
              <input
                type="file"
                value={qualificationDocument}
                onChange={(e) => setQualificationDocument(e.target.value)}
                className={error && !qualificationDocument ? "error" : ""}
              />
            </>
          ) : (
            <>
              <input
                placeholder="WorkshopName"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className={error && !workshopName ? "error" : ""}
              />
              <button
                className="registerform_button"
                type="button"
                onClick={toggleModal}
              >
                Pick Workshop Location on Map
              </button>
            </>
          )}
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error && !password ? "error" : ""}
          />
          <input
            placeholder="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={error && !confirmPassword ? "error" : ""}
          />
          <button className="registerform_button" type="submit">
            submit
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {isModalOpen && (
            <Modal onClose={toggleModal}>
              <Maps
                workshopLocation={workshopLocation}
                setWorkshopLocation={setWorkshopLocation}
              />
            </Modal>
          )}
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#f5deb3" }}
            >
              login{" "}
            </Link>
            to proceed
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
