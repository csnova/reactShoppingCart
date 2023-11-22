import "../styles/Tile.css";

function Tile({
  tile,
  title,
  price,
  image,
  index,
  shoppingCart,
  setShoppingCart,
}) {
  let titleClassName = "tileTitle";
  if (title.length >= 55) {
    titleClassName = "longTileTitle";
  }

  let itemPrice = price;
  itemPrice = itemPrice.toFixed(2);

  const buttonClassName = `addButton${index}`;

  function onAddClick(e) {
    let found = false;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (tile.title === shoppingCart[i].title) {
        found = true;
        const currentShoppingCartItem = shoppingCart[i];
        const replacementShoppingCart = {
          ...currentShoppingCartItem,
          quantity: currentShoppingCartItem.quantity + 1,
        };
        setShoppingCart((prevState) => {
          const nextState = [...prevState];
          nextState[i] = replacementShoppingCart;
          localStorage.setItem("localShoppingCart", JSON.stringify(nextState));
          return nextState;
        });
      }
    }
    if (found === false) {
      let currentIndex = e.target.className;
      currentIndex = currentIndex.slice(9);
      let currentCart = [...shoppingCart, { ...tile, quantity: 1 }];
      localStorage.setItem("localShoppingCart", JSON.stringify(currentCart));
      setShoppingCart(currentCart);
    }
  }

  return (
    <>
      <div className="tile">
        <p className={titleClassName}>{title}</p>
        <img className="productImage" src={image} alt={title} />
        <p className="tilePrice">Price: ${itemPrice}</p>
        <button onClick={onAddClick} className={buttonClassName}>
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default Tile;
