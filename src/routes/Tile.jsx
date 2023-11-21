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

  const buttonClassName = `addButton${index}`;

  function onAddClick(e) {
    let currentIndex = e.target.className;
    currentIndex = currentIndex.slice(9);
    let currentCart = [...shoppingCart, { ...tile, quantity: 1 }];
    setShoppingCart(currentCart);
  }

  return (
    <>
      <div className="tile">
        <p className={titleClassName}>{title}</p>
        <img className="productImage" src={image} alt={title} />
        <p className="tilePrice">Price: ${price}</p>
        <button onClick={onAddClick} className={buttonClassName}>
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default Tile;
