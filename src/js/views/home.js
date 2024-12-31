import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const { data, category, favorites } = store;

  useEffect(() => {
    if (!store.data.results.length) {
      actions.fetchData("people");
    }
  }, [actions, store.data.results.length]);

  const getImageUrl = (id, category) =>
    category === "people"
      ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
      : `https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`;

  const handleError = (currentTarget) => {
    currentTarget.onerror = null;
    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };

  const isFavorite = (item) => favorites.includes(item);

  const getItemTitle = (item) => item.properties?.title || item.name || item.title;

  const renderCategories = () =>
    ["people", "species", "starships", "vehicles", "planets", "films"].map((category) => (
      <div 
        key={category} 
        onClick={() => actions.fetchData(category)} 
        style={{ cursor: "pointer" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
    ));

  const renderResults = () =>
    data.results.map((item, index) => {
      const id = category === "films" ? item.uid : item.url?.split("/")[5];
      const imageUrl = getImageUrl(id, category);
      const itemTitle = getItemTitle(item);

      return (
        <div key={index} className="col-6 col-md-4 col-lg-3 my-3">
          <div className="card text-center">
            <h5 className="card-title mt-2">{itemTitle}</h5>
            <div 
              className="image-container" 
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "250px", 
                border: "2px solid white",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <img
                src={imageUrl}
                alt={itemTitle}
                onError={({ currentTarget }) => handleError(currentTarget)}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <Link to={`/single/${category}/${id}`}>
              <button
                style={{
                  marginTop: "10px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  outline: "none",
                }}
              >
                View Details
              </button>
            </Link>
            <button
              onClick={() => actions.handleFavorite(itemTitle)}
              className="heart-icon"
              style={{
                fontSize: "40px",
                color: isFavorite(itemTitle) ? "red" : "grey",
                cursor: "pointer",
                marginLeft: "8px",
                background: "none",
                border: "none",
                padding: "0",
                outline: "none",
              }}
            >
              ♥
            </button>
          </div>
        </div>
      );
    });

  return (
    <div className="container-fluid bg-light text-dark pt-5">
      <div className="row">
        <div className="justify-large-text fw-light col-md-2">
          <h5>Menu</h5>
          {renderCategories()}
        </div>
        <div className="col-md-10" style={{ paddingBottom: "100px" }}>
          <h4>Results</h4>
          <div className="row">{renderResults()}</div>
        </div>
      </div>
    </div>
  );
};
