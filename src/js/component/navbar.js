import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store } = useContext(Context);
  const favoritesCount = store.favorites?.length || 0;

  const renderFavorites = () => {
    if (favoritesCount === 0) {
      return <li className="dropdown-item">No hay favoritos</li>;
    }

    return store.favorites.map((fav, index) => (
      <li key={index} className="dropdown-item">
        {fav}
      </li>
    ));
  };

  return (
    <nav className="navbar navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
        <img
  src="data:image/png;base64,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"
  alt="logo"
  style={{
    width: '100px',  
    height: 'auto',  
    border: "2px solid white",
    borderRadius: "5px",
    objectFit: "cover",
    cursor: "pointer"
  }}
/>
        </Link>
        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites ({favoritesCount})
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {renderFavorites()}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};