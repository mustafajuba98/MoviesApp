import React, { useState, useEffect } from "react";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

import MuiCardComponent from "../Components/Card";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = "1c61f7854caf371b34a23ef611f0efed";

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(
            res.data.total_pages > 500 ? 500 : res.data.total_pages
          );
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching movies:", err);
          setError(
            "Failed to load movies. Please check your connection and try again."
          );
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    if (value !== currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage(value);
    }
  };

  const itemsPerPage = 20;

  return (
    <Box
      sx={{ width: "100%", py: { xs: 3, md: 5 }, px: { xs: 1, sm: 2, md: 3 } }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: { xs: 4, md: 6 } }}
      >
        Popular Movies
      </Typography>

      {error && !isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
          <Alert severity="error" sx={{ width: "100%", maxWidth: "lg" }}>
            {error}
          </Alert>
        </Box>
      )}

      <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
        {isLoading
          ? [...Array(itemsPerPage)].map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={2.4} xl={2}>
                <Skeleton
                  variant="rectangular"
                  sx={{ aspectRatio: "2/3", height: "auto", borderRadius: 1 }}
                />
                <Skeleton variant="text" sx={{ mt: 1, mb: 0.5 }} />
                <Skeleton variant="rectangular" height={36} />
              </Grid>
            ))
          : movies.map((movie) => (
              <Grid
                item
                key={movie.id}
                xs={6}
                sm={4}
                md={3}
                lg={2.4}
                xl={2}
                sx={{ display: "flex" }}
              >
                <MuiCardComponent
                  id={movie.id}
                  img={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder-image.png"
                  }
                  name={movie.title}
                  path={`/moviedetails/${movie.id}`}
                />
              </Grid>
            ))}
        {!isLoading && !error && movies.length === 0 && (
          <Typography
            sx={{ mt: 5, width: "100%", textAlign: "center" }}
            color="text.secondary"
          >
            No movies found for this page.
          </Typography>
        )}
      </Grid>

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 5, md: 8 },
            mb: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{ visibility: isLoading ? "hidden" : "visible" }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Movies;
