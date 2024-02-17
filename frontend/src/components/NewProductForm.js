import React, { useState } from "react";

const NewProductForm = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("seating");
  const [woodType, setWoodType] = useState("oak");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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

  const handleAddItem = (e) => {
    e.preventDefault();
    alert("Item added!");
  };

  return (
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
  );
};

export default NewProductForm;
