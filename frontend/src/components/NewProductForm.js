import { useState } from "react";
const NewProductForm = () => {
  const [itemUpload, setItemUpload] = useState();
  function handleItemUpload(e) {
    setItemUpload(URL.createObjectURL(e.target.files[0]));
  }
  function handleAddItem(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleAddItem}>
      <input type="file" onChange={handleItemUpload} />
      <img src={itemUpload} alt="itemupload" />
      <textarea rows="4" cols="50">
        Enter item Description
      </textarea>
      <select>
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
      <select>
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
      <input type="date" />
      <input type="text" />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default NewProductForm;
