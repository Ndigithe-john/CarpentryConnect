const Product = ({ item }) => {
  return (
    <div className="products_card">
      <img src={item.ImageURL} alt="productImages" className="product_img" />
      <p>{item.Description}</p>
      <p>{item.Category}</p>
      <h5>Ksh. {item.Price}</h5>
    </div>
  );
};

export default Product;
