import React from "react";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  function handleProfileUpdate(e) {
    e.preventDefault();
  }
  return (
    <form className="update_profile_details" onSubmit={handleProfileUpdate}>
      <label>Email</label>
      <input type="email" />
      <label>PhoneNumber</label>
      <input type="text" />
      <label>Bio</label>
      <textarea name="description" rows="4" placeholder="Enter a description" />

      <button type="submit">
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          update
        </Link>
      </button>
    </form>
  );
};

export default UpdateProfile;
