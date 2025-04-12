import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// MUI Imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"; 

import MuiCardComponent from "../Components/Card"; 

function FavouriteMovies() {
  const favouriteMoviesData = useSelector(
    (state) => state.isfavourite.Favourites || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  return (
    <Container sx={{ py: 4 }}>
      {" "}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Favourite Movies
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : favouriteMoviesData.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          You haven't added any movies to your favourites yet.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {favouriteMoviesData.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MuiCardComponent 
                id={movie.id}
                img={
                  movie.img ||
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                } 
                name={movie.name || movie.title}

              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FavouriteMovies;
