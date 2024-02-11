// LocationModal.js
import React from "react";
import LocationMap from "./LocationMap";

const LocationModal = ({ onLocationSelect, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <LocationMap onLocationSelect={onLocationSelect} />
      </div>
    </div>
  );
};

export default LocationModal;
