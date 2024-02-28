import React from "react";
import { Link } from "react-router-dom";
const UpdateProfile = () => {
  return (
    <form className="update_profile_details">
      <label>Email</label>
      <input type="email" />
      <label>PhoneNumber</label>
      <input type="text" />
      <label>Bio</label>
      <textarea name="description" rows="4" placeholder="Enter a description" />

      <button>
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          update
        </Link>
      </button>
    </form>
  );
};

export default UpdateProfile;
