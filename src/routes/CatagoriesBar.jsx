import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "../styles/sideBar.css";

const CatagoriesBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTerm(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <div className="leftBar">
        <div>
          <div id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={searchTerm}
              onChange={handleSearchTerm}
            />
            <div id="search-spinner" aria-hidden />
            <div className="sr-only" aria-live="polite"></div>
          </div>
        </div>
        <div className="catagories"></div>
      </div>
    </>
  );
};

export default CatagoriesBar;

// "men's clothing"

// "jewelery"

// "electronics"

// "women's clothing"
