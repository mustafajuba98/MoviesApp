import "bootstrap/dist/css/bootstrap.min.css";
// import Loginform from "./Forms/loginform";
// import Registerform from "./Forms/registerform";
// import ToDoApp from "./Forms/ToDoApp";
import Navbar from "./Pages/navbar";
import Home from "./Pages/home";
import Notfound from "./Pages/notfound";
import Loginform from "./Forms/loginform";
import Registerform from "./Forms/registerform";
import Movies from "./Pages/movies";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import axios from "react";
import moviedetails from "../src/Pages/moviedetails";
import FavouriteMovies from "./Pages/FavouriteMovies";

function App() {




  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Loginform" component={Loginform} exact />
          <Route path="/Registerform" component={Registerform} exact />
          <Route path="/Movies" component={Movies} exact />
          <Route path="/Moviedetails/:id" component={moviedetails} exact />
          <Route path="/FavouriteMovies" component={FavouriteMovies} exact />



          <Route path="*" component={Notfound} exact />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
