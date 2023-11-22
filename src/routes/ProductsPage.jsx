import { Link } from "react-router-dom";
import getProducts from "./getProducts";
import Tile from "./Tile";

const ProductsPage = ({ shoppingCart, setShoppingCart }) => {
  const { productInfo, error, loading } = getProducts();
  if (error) return <p>A Network Error has occurred.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="mainPage">
      {productInfo.map((tile, index) => {
        return (
          <div key={tile.id}>
            <Tile
              tile={tile}
              image={tile.image}
              title={tile.title}
              price={tile.price}
              index={index}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
