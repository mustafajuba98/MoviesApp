import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import setFavourite_action from "../Redux/Actions/FavouriteAction";


function Navbar() {
  // to get data from store --> useSelector
  const fav = useSelector((state) => state.isfavourite.isFavourite);
  const counter = useSelector((state) => state.isfavourite.count);

  //

  const dispatch = useDispatch();
  const setFavourite = () => {
    // change stor --> dispatch action --> useDispatch
    dispatch(setFavourite_action(fav == "isFavourite" ? "isNotFavourite" : "isFavourite"))
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/Loginform">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Registerform">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/FavouriteMovies">
                  Favourite Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Movies"
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <button className="btn btn-primary" 
                  onClick={() => setFavourite()}
                  >
                    FavCount: {counter}
                    </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
