import React, { useState, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Navbar from "./Pages/navbar";
import Footer from "./Components/Footer"; // Adjusted path assuming Footer is in Components
import Home from "./Pages/home";
import Movies from "./Pages/movies";
import FavouriteMovies from "./Pages/FavouriteMovies";
import Moviedetails from "./Pages/moviedetails";
import Loginform from "./Forms/loginform";
import Registerform from "./Forms/registerform";
import Notfound from "./Pages/notfound";
import TodoApp from "./Forms/ToDoApp"; // Adjusted path based on user's code

function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar
          currentMode={mode}
          toggleColorMode={colorMode.toggleColorMode}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movies" component={Movies} />
            <Route path="/favouritemovies" component={FavouriteMovies} />
            <Route path="/moviedetails/:id" component={Moviedetails} />
            <Route path="/loginform" component={Loginform} />
            <Route path="/registerform" component={Registerform} />
            <Route path="/todo" component={TodoApp} />
            <Route path="*" component={Notfound} />
          </Switch>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
