import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Products = ({ userRole }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (userRole === "Carpenter") {
          response = await axios.get("http://localhost:5050/users/pending");
        } else if (userRole === "WorkshopOwner") {
          response = await axios.get(
            "http://localhost:5050/users/carpenterPosts"
          );
        }

        setProductData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [userRole]);

  return (
    <div className="products">
      {productData.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </div>
  );
};

export default Products;
