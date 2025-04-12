import { useParams, Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// MUI Imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip"; // لعرض التصنيفات
import Stack from "@mui/material/Stack"; // لترتيب العناصر بسهولة
import StarIcon from "@mui/icons-material/Star"; // أيقونة النجمة
import Rating from "@mui/material/Rating"; // لعرض التقييم بالنجوم
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// لا نحتاج Card هنا، سنعرض التفاصيل مباشرة

function Moviedetails() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "1c61f7854caf371b34a23ef611f0efed"; // Secure this ideally

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setMovie(null); // Reset movie state on ID change
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        setMovie(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err.message);
        if (err.response && err.response.status === 404) {
          setError("Movie not found.");
        } else {
          setError("Could not load movie details. Please try again.");
        }
        setIsLoading(false);
      });
  }, [params.id]);

  const formatCurrency = (number) => {
    if (!number) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? hours + "h " : ""}${mins}min`;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Button
          component={RouterLink}
          to="/movies"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Movies
        </Button>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!movie) {
    // Should not happen if error handles 404, but as a fallback
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Movie data unavailable.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* زر العودة */}
      <Button
        component={RouterLink}
        to="/movies"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Movies
      </Button>

      <Grid container spacing={4}>
        {/* Movie Poster Column */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: { xs: 450, md: "auto" }, // تحديد أقصى ارتفاع للصورة على الشاشات الصغيرة
              objectFit: "cover",
              borderRadius: 2, // حواف دائرية للصورة
              boxShadow: 3, // ظل خفيف
            }}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-image.png"
            }
            alt={`Poster for ${movie.title}`}
          />
        </Grid>

        {/* Movie Details Column */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {movie.title}
          </Typography>
          {movie.tagline && (
            <Typography
              variant="h6"
              fontStyle="italic"
              color="text.secondary"
              gutterBottom
            >
              "{movie.tagline}"
            </Typography>
          )}

          {/* Rating, Release Date, Runtime */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ my: 2 }}
            flexWrap="wrap"
          >
            <Rating
              name="read-only"
              value={movie.vote_average ? movie.vote_average / 2 : 0} // تحويل مقياس 10 إلى 5 نجوم
              precision={0.1} // دقة عرض النجوم
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              ({movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} /
              10) - {movie.vote_count} votes
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
            <Typography variant="body2">
              Release: {movie.release_date || "N/A"}
            </Typography>
            <Typography variant="body2">
              Runtime: {formatRuntime(movie.runtime)}
            </Typography>
          </Stack>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Genres
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Overview */}
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {" "}
            {/* paragraph يضيف هامش سفلي */}
            {movie.overview || "No overview available."}
          </Typography>

          {/* Budget and Revenue */}
          {(movie.budget > 0 || movie.revenue > 0) && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {movie.budget > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" component="div">
                    Budget
                  </Typography>
                  <Typography variant="body2">
                    {formatCurrency(movie.budget)}
                  </Typography>
                </Grid>
              )}
              {movie.revenue > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" component="div">
                    Revenue
                  </Typography>
                  <Typography variant="body2">
                    {formatCurrency(movie.revenue)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {/* Add Favourite Button Placeholder */}
          {/* تحتاج إلى إضافة منطق الزر هنا باستخدام نفس طريقة Card */}
          {/* <Button variant="contained" color="primary" startIcon={<StarIcon />}>
             Add to Favourites (Logic Needed)
          </Button> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Moviedetails;
