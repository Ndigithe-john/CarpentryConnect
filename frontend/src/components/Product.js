import { Link } from "react-router-dom";
const Product = ({ item }) => {
  return (
    <div className="products_card">
      <Link to={`/item/${item.ItemID}`}>
        <img src={item.ImageURL} alt="productImages" className="product_img" />
      </Link>
      <p>{item.Description}</p>
      <p>{item.Category}</p>
      <h5>Ksh. {item.Price}</h5>
    </div>
  );
};

export default Product;
