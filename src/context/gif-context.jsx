import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (id) => {
    if (favourites.includes(id)) {
      const updatedFavourites = favourites.filter((itemId) => item !== id);
      localStorage.setItem("favouriteGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } else{
      const updatedFavourites = [...favourites]
      updatedFavourites.push(id)
      localStorage.setItem("favouriteGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    }
  };
  useEffect(() => {
   const favourites = JSON.parse(localStorage.getItem("favouriteGIFs")) || [];
   setFavourites(favourites);
  },[]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <GifContext.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favourites,  addToFavourites}}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
