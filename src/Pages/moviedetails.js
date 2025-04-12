import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { useState, useEffect } from "react";
import axios from "axios";

function Moviedetails() {
  const params = useParams();
  const [movie, setMovie] = useState(
    "https://image.tmdb.org/t/p/w500${movie.poster_path}"
  );

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=1c61f7854caf371b34a23ef611f0efed`
      )
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.message));
  }, [params]);

  return (
    <>
      <Card
        img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        name={movie.overview}
      />
    </>
  );
}

export default Moviedetails;
