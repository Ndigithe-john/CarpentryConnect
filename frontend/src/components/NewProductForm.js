import axios from "axios";
import React, { useState, useEffect } from "react";

const NewProductForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("seating");
  const [woodType, setWoodType] = useState("oak");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const present_key = "wechatApp";
  const cloud_name = "demowwhy5";
  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // 5000 milliseconds (5 seconds)

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage]);
  const handleFileChange = async (e) => {
    const selectedImage = e.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", present_key);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    const secure_url = response.data.secure_url;
    console.log(secure_url);
    setImage(secure_url);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleWoodTypeChange = (e) => {
    setWoodType(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const itemData = {
        ImageURL: image,
        Description: description,
        Category: category,
        Material: woodType,
        DateRequired: date,
        Price: price,
      };
      const newItem = await axios.post(
        `http://localhost:5050/users/post`,
        itemData,
        { withCredentials: true }
      );
      if (newItem.status === 200) {
        console.log("Image added successfully");

        setImage(null);
        setDescription("");
        setCategory("seating");
        setWoodType("oak");
        setDate("");
        setPrice("");
        setSuccessMessage("Item created successfully");
      }
    } catch (error) {
      console.error("Error Creating an Item:", error.message);
      setError("Error during item upload. Please try again later.");
    }
  };

  return (
    <div className="div_form_display">
      {successMessage && <h2 className="success-message">{successMessage}</h2>}
      <form className="new-product-form" onSubmit={handleAddItem}>
        <label className="new_product_label">Choose File</label>
        <input
          className="form_type"
          type="file"
          id="fileInput"
          name="fileInput"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
        <label className="new_product_label">Description</label>
        <textarea
          className="form_type"
          id="description"
          name="description"
          rows="4"
          placeholder="Enter a description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <label className="new_product_label">Choose Item Category</label>
        <select
          className="form_type"
          id="category"
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option>Seating</option>
          <option>Sleeping</option>
          <option>Storage</option>
          <option>Dinning</option>
          <option>Office</option>
          <option>Outdoor</option>
          <option>Accent</option>
          <option>Industrial</option>
          <option>Entryway</option>
        </select>
        <label className="new_product_label">Choose Wood type</label>
        <select
          className="form_type"
          id="woodType"
          name="woodType"
          value={woodType}
          onChange={handleWoodTypeChange}
        >
          <option>Oak</option>
          <option>Maple</option>
          <option>Hemlock</option>
          <option>Mahogany</option>
          <option>Ash</option>
          <option>Cypress</option>
          <option>Walnut</option>
          <option>Spruce</option>
          <option>Cedar</option>
          <option>Cherry</option>
        </select>
        <label className="new_product_label">Required Date</label>
        <input
          className="form_type"
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleDateChange}
        />
        <label className="new_product_label">Item Price</label>
        <input
          className="form_type"
          type="number"
          id="price"
          name="price"
          placeholder="Enter the price"
          value={price}
          onChange={handlePriceChange}
        />

        <button type="submit" className="add_item_button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
