import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";

import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [trendingError, setTrendingError] = useState(null);

  const API_KEY = "1c61f7854caf371b34a23ef611f0efed";

  useEffect(() => {
    const fetchTrending = async () => {
      setLoadingTrending(true);
      setTrendingError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results.slice(0, 8));
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setTrendingError("Could not load trending movies.");
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 3, md: 4 }, mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 6 },
          mb: 6,
          background: "linear-gradient(45deg, #1976d2 30%, #64b5f6 90%)",
          color: "white",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              fontWeight="bold"
            >
              Welcome to Movies App!
            </Typography>
            <Typography variant="h5" paragraph sx={{ opacity: 0.9 }}>
              Your ultimate destination to discover popular movies, dive into
              details, and curate your personal collection of favorites.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<MovieIcon />}
              component={RouterLink}
              to="/movies"
              sx={{
                mt: 2,
                backgroundColor: "white",
                color: "#1976d2",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              Browse Popular Movies
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TheatersIcon
              sx={{ fontSize: 180, color: "rgba(255, 255, 255, 0.3)" }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight={500}>
          Why Choose Our App?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto" }}
        >
          We focus on simplicity and providing the essential tools for movie
          lovers. Explore, track, and enjoy!
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="stretch"
        alignItems="stretch"
        sx={{ mb: 6 }}
      >
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.light",
                width: 56,
                height: 56,
                margin: "0 auto 16px auto",
              }}
            >
              <SearchIcon />
            </Avatar>
            <Typography variant="h6" component="h3" gutterBottom>
              Effortless Discovery
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1, mb: 2 }}
            >
              Quickly browse currently popular movies with a clean and intuitive
              interface.
            </Typography>
            <Button
              component={RouterLink}
              to="/movies"
              variant="text"
              size="small"
            >
              Learn More
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "error.light",
                width: 56,
                height: 56,
                margin: "0 auto 16px auto",
              }}
            >
              <FavoriteIcon />
            </Avatar>
            <Typography variant="h6" component="h3" gutterBottom>
              Personalized Favorites
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1, mb: 2 }}
            >
              Build your watchlist by easily adding movies you love to your
              personal list.
            </Typography>
            <Button
              component={RouterLink}
              to="/favouritemovies"
              variant="text"
              size="small"
            >
              Learn More
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ display: "flex" }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.light",
                width: 56,
                height: 56,
                margin: "0 auto 16px auto",
              }}
            >
              <InfoIcon />
            </Avatar>
            <Typography variant="h6" component="h3" gutterBottom>
              In-Depth Details
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1, mb: 2 }}
            >
              Access comprehensive information like plot summaries, ratings,
              cast, and more.
            </Typography>
            <Button
              component={RouterLink}
              to="/movies"
              variant="text"
              size="small"
            >
              Learn More
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          fontWeight={500}
          sx={{ mb: 4 }}
        >
          Trending This Week
        </Typography>
        {loadingTrending ? (
          <Grid container spacing={2} justifyContent="center">
            {[...Array(8)].map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={2.4} xl={1.5}>
                <Skeleton
                  variant="rectangular"
                  sx={{ aspectRatio: "2/3", borderRadius: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : trendingError ? (
          <Alert severity="error" sx={{ maxWidth: "lg", mx: "auto" }}>
            {trendingError}
          </Alert>
        ) : (
          <Grid container spacing={{ xs: 1, sm: 2 }} justifyContent="center">
            {trendingMovies.map((movie) => (
              <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4} xl={1.5}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    "&:hover .movie-overlay": { opacity: 1 },
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(
                            movie.title || "No+Image"
                          )}`
                    }
                    alt={movie.title}
                    sx={{
                      aspectRatio: "2/3",
                      objectFit: "cover",
                      display: "block",
                      width: "100%",
                    }}
                  />
                  <Box
                    className="movie-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.65)",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease-in-out",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ px: 1 }}
                    >
                      {movie.title}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      component={RouterLink}
                      to={`/moviedetails/${movie.id}`}
                      sx={{
                        mt: 1,
                        borderColor: "rgba(255,255,255,0.5)",
                        fontSize: "0.7rem",
                      }}
                    >
                      Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            component={RouterLink}
            to="/movies"
            size="large"
          >
            View All Popular Movies
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 6,
          textAlign: "center",
          backgroundColor: "action.hover",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom>
          Ready to Explore?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Dive into the world of cinema. Browse the latest popular movies now!
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/movies"
        >
          Let's Go!
        </Button>
      </Paper>
    </Box>
  );
}

export default Home;
