import React from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon

function Navbar({ currentMode, toggleColorMode }) {
  // Receive props
  const favouriteCount = useSelector(
    (state) => state.isfavourite.Favourites?.length || 0
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            "&:hover": { opacity: 0.9 },
          }}
        >
          Movies App
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/movies">
            Movies
          </Button>
          <Button color="inherit" component={NavLink} to="/todo">
            ToDo
          </Button>
          <IconButton
            size="large"
            aria-label={`show ${favouriteCount} favourite movies`}
            color="inherit"
            component={RouterLink}
            to="/favouritemovies"
            sx={{ mx: 0.5 }}
          >
            <Badge badgeContent={favouriteCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" component={NavLink} to="/loginform">
            Login
          </Button>
          <Button color="inherit" component={NavLink} to="/registerform">
            Register
          </Button>
        </Box>

        {/* Theme Toggle Button */}
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
