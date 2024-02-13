import Data from "./Data/Data";
import Product from "./Product";
const Products = () => {
  return (
    <div className="products">
      {Data.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </div>
  );
};

export default Products;
