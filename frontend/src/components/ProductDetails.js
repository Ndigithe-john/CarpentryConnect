import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { ItemID } = useParams();
  const [productDetails, setProductDetails] = useState({});

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

  return (
    <div>
      <h2>Item Details</h2>
      <img src={productDetails.ImageURL} alt="item_image" />
    </div>
  );
};

export default ProductDetails;
