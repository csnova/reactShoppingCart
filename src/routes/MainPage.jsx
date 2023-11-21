import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import cart from "../assets/cart-shopping-solid.svg";
import ProductsPage from "./ProductsPage";
import ShoppingCart from "./ShoppingCart";

const MainPage = () => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const { page } = useParams();

  return (
    <>
      <div className="navBar">
        <div className="logoBar">
          <img src={logo} alt="" className="logo" />
          <p className="title">Nova Emporium</p>
        </div>
        <div className="navLinks">
          <Link to="/productsPage" className="link">
            Products Page
          </Link>
          <Link to="/shoppingCart" className="currentCart">
            <img src={cart} alt="current shopping cart" className="cart" />
            <p className="cartAmount">{shoppingCart.length}</p>
          </Link>
        </div>
      </div>
      <div className="fullBody">
        {page === "productsPage" ? (
          <ProductsPage
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
          />
        ) : page === "shoppingCart" ? (
          <ShoppingCart
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
          />
        ) : (
          <ProductsPage
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
