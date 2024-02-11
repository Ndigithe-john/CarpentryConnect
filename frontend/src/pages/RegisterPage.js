// RegisterPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import NavBar from "../components/NavBar";

import LocationModal from "../components/LocationModal";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState(null);
  const [role, setRole] = useState("Carpenter");
  const [qualification, setQualification] = useState("");
  const [qualificationDocument, setQualificationDocument] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [workshopLocationCoords, setWorkshopLocationCoords] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  const handleLocationSelect = (location) => {
    setWorkshopLocationCoords(location);
    setShowMap(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            type="text"
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
                <option>Certificate in Capentry</option>
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
              <button type="button" onClick={openModal}>
                Pick Workshop Location on Map
              </button>
              {isModalOpen && (
                <LocationModal
                  onLocationSelect={handleLocationSelect}
                  closeModal={closeModal}
                />
              )}
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
            Already have an account?
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
