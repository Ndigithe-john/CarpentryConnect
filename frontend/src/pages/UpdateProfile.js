import React from "react";

const UpdateProfile = () => {
  return (
    <form className="update_profile_details">
      <label>Email</label>
      <input type="email" />
      <label>PhoneNumber</label>
      <input type="text" />
      <label>Bio</label>
      <textarea name="description" rows="4" placeholder="Enter a description" />
      <button>update</button>
    </form>
  );
};

export default UpdateProfile;
