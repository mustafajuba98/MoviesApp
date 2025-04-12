import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import setFavourite_action from "../Redux/Actions/FavouriteAction";

function MuiCardComponent(props) {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector(
    (state) => state.isfavourite.Favourites || []
  );
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const isFav = favouriteMovies.some((fav) => fav && fav.id === props.id);
    setIsFilled(isFav);
  }, [favouriteMovies, props.id]);

  const handleToggleFavourite = () => {
    const newFilledState = !isFilled;
    dispatch(
      setFavourite_action({
        id: props.id,
        isFavourite: newFilledState,
        movieDetails: {
          id: props.id,
          name: props.name,
          img: props.img,
        },
      })
    );
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        m: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={props.img || "/placeholder-image.png"}
        alt={props.name || "Movie Poster"}
        sx={{ objectFit: "cover" }}
      />
      <IconButton
        aria-label={isFilled ? "Remove from favourites" : "Add to favourites"}
        onClick={handleToggleFavourite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "gold",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        {isFilled ? (
          <StarIcon fontSize="large" />
        ) : (
          <StarBorderIcon fontSize="large" />
        )}
      </IconButton>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          title={props.name}
        >
          {props.name}
        </Typography>
        {props.path && (
          <Button
            variant="contained"
            component={Link}
            to={props.path}
            sx={{ mt: "auto", width: "100%" }}
            size="small"
          >
            Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default MuiCardComponent;
