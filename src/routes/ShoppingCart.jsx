import { Link } from "react-router-dom";
import "../styles/shoppingCart.css";

const ShoppingCart = ({ shoppingCart, setShoppingCart }) => {
  function handleQuantityChange(index) {
    return (e) => {
      const currentShoppingCartItem = shoppingCart[index];
      const replacementShoppingCart = {
        ...currentShoppingCartItem,
        quantity: e.target.value,
      };
      setShoppingCart((prevState) => {
        const nextState = [...prevState];
        nextState[index] = replacementShoppingCart;
        return nextState;
      });
    };
  }

  function handleIncreasedQuantity(index) {
    return (e) => {
      const currentShoppingCartItem = shoppingCart[index];
      const replacementShoppingCart = {
        ...currentShoppingCartItem,
        quantity: currentShoppingCartItem.quantity + 1,
      };
      setShoppingCart((prevState) => {
        const nextState = [...prevState];
        nextState[index] = replacementShoppingCart;
        return nextState;
      });
    };
  }

  function handleDecreasedQuantity(index) {
    return (e) => {
      const currentShoppingCartItem = shoppingCart[index];
      if (currentShoppingCartItem.quantity <= 1) return;
      const replacementShoppingCart = {
        ...currentShoppingCartItem,
        quantity: currentShoppingCartItem.quantity - 1,
      };
      setShoppingCart((prevState) => {
        const nextState = [...prevState];
        nextState[index] = replacementShoppingCart;
        return nextState;
      });
    };
  }

  function handleDelete(index) {
    return () => {
      let currentShoppingCart = [...shoppingCart];
      currentShoppingCart.splice(index, 1);
      setShoppingCart(currentShoppingCart);
    };
  }

  return (
    <div>
      <h1 className="cartTitle">Shopping Cart</h1>
      <div className="shoppingCartTable">
        <div className="tableHeader">
          <h2 className="column0 cell">X</h2>
          <h2 className="column1 cell">Product</h2>
          <h2 className="column2 cell">Price</h2>
          <h2 className="column3 cell">Quantity</h2>
          <h2 className="column4 cell">Subtotal</h2>
        </div>
        {shoppingCart.map((item, index) => {
          const subtotal = item.price * item.quantity;
          const currentIndex = index;
          return (
            <div key={item.title} className="cartItem">
              <h3 className="column0 cell">
                <button
                  className="deleteButton"
                  onClick={handleDelete(currentIndex)}
                >
                  X
                </button>
              </h3>
              <h3 className="column1 cell">{item.title}</h3>
              <h3 className="column2 cell">${item.price}</h3>
              <div className="column3 cell">
                <button
                  className="lessArrow"
                  onClick={handleDecreasedQuantity(currentIndex)}
                >
                  &#x3c;
                </button>
                <input
                  type="text"
                  className="quantityBox"
                  value={item.quantity}
                  onChange={handleQuantityChange(currentIndex)}
                />
                <button
                  className="moreArrow"
                  onClick={handleIncreasedQuantity(currentIndex)}
                >
                  &#x3e;
                </button>
              </div>

              <h3 className="column4 cell">${subtotal}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingCart;
