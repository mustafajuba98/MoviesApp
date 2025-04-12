import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card";
import { useSelector } from "react-redux";




function FavouriteMovies(props) {
  const fav = useSelector((state) => state.isfavourite.isFavourite);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=1c61f7854caf371b34a23ef611f0efed"
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Movies</h1>
      {movies.map((movie) => {
        return (
          <Card
            key={movie.id}
            img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            name={movie.title}
            // fav === "isFavourite"
          />
        );
      })}
    </>
  );
}

export default FavouriteMovies;
