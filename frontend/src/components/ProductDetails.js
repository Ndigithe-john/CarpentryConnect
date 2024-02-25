import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { ItemID } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [minDate, setMinDate] = useState(getCurrentDate());
  const [selectedDate, setSelectedDate] = useState("");

  function getCurrentDate() {
    const currentDate = new Date().toISOString().split("T")[0];
    return currentDate;
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/users/workshopItem/${ItemID}`
        );
        setProductDetails(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [ItemID]);

  const handleDateChange = (e) => {
    const selected = e.target.value;

    if (selected >= getCurrentDate()) {
      setSelectedDate(selected);
    } else {
      setSelectedDate("");
    }
  };

  return (
    <div className="item_specific_container">
      <div className="item_specific_heading">
        <h1>Item Details</h1>
      </div>
      <div className="item_specific_body">
        <div>
          <img
            src={productDetails.ImageURL}
            alt="item_image"
            className="item_specific_image"
          />
        </div>
        <div className="item_specific_about">
          <h2>Item Category: {productDetails.Category}</h2>
          <h2>Item Material: {productDetails.Material}</h2>
          <h2>Item Description: {productDetails.Description}</h2>
          <h2>Item DateRequired: {productDetails.DateRequired}</h2>
          <h2>Item Price: Ksh {productDetails.Price}</h2>
          <label>Estimated completion date</label>
          <input
            type="date"
            className="input_item_specific"
            min={minDate}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <input
            type="text"
            className="input_item_specific"
            placeholder="Input a Short Description to be noted"
          />
          <button className="button_item_specific">Apply For Job</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
