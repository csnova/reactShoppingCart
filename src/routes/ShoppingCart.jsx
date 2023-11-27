import React, { useEffect, useState, useMemo } from "react";
import "../styles/shoppingCart.css";

const ShoppingCart = ({ shoppingCart, setShoppingCart }) => {
  const totalPrice = useMemo(() => {
    let currentCartTotal = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
      currentCartTotal =
        currentCartTotal + shoppingCart[i].price * shoppingCart[i].quantity;
    }
    currentCartTotal = currentCartTotal.toFixed(2);
    return currentCartTotal;
  }, [shoppingCart]);

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
        localStorage.setItem("localShoppingCart", JSON.stringify(nextState));
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
        localStorage.setItem("localShoppingCart", JSON.stringify(nextState));
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
        localStorage.setItem("localShoppingCart", JSON.stringify(nextState));
        return nextState;
      });
    };
  }

  function handleDelete(index) {
    return () => {
      let currentShoppingCart = [...shoppingCart];
      currentShoppingCart.splice(index, 1);
      localStorage.setItem(
        "localShoppingCart",
        JSON.stringify(currentShoppingCart)
      );
      setShoppingCart(currentShoppingCart);
    };
  }

  function handleEmpty() {
    return () => {
      localStorage.setItem("localShoppingCart", JSON.stringify([]));
      setShoppingCart([]);
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
        <div className="emptyCart">
          {shoppingCart.length ? "" : <p>No Items in Cart</p>}
        </div>
        {shoppingCart.map((item, index) => {
          let subtotal = item.price * item.quantity;
          subtotal = subtotal.toFixed(2);
          let itemPrice = item.price;
          itemPrice = itemPrice.toFixed(2);
          const currentIndex = index;
          return (
            <div key={item.id} className="cartItem">
              <p className="column0 cell itemCell">
                <button
                  className="deleteButton"
                  onClick={handleDelete(currentIndex)}
                >
                  X
                </button>
              </p>
              <p className="column1 cell itemCell">{item.title}</p>
              <p className="column2 cell itemCell">${itemPrice}</p>
              <div className="column3 itemCell cell">
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

              <p className="column4 cell itemCell">${subtotal}</p>
            </div>
          );
        })}
      </div>
      <div className="cartTotal">
        <h2 className="cartTotalTitle">Cart Total</h2>
        <div className="cartTotalBox">
          <div className="row1">
            <h2 className="lowerCell cellTitle">Subtotal</h2>
            <p className="lowerCell">${totalPrice}</p>
          </div>
          <div className="row2">
            <h2 className="lowerCell cellTitle">Total</h2>
            <p className="lowerCell">${totalPrice}</p>
          </div>
        </div>
      </div>
      <div className="checkoutButtonBox">
        <button className="emptyButton" onClick={handleEmpty()}>
          Empty Cart
        </button>
        <button className="emptyButton">Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
