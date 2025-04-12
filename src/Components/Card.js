import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import setFavourite_action from "../Redux/Actions/FavouriteAction";
import { useDispatch, useSelector } from "react-redux";

function Card(props) {
  // عملتها اوبجكت علشان احط جواه key : value
  const [isFilled, setIsFilled] = useState({});

  const fav = useSelector((state) => state.isfavourite.Favourites);
  // const counter = useSelector((state) => state.isfavourite.count);

  const dispatch = useDispatch();
  const props_id = props.id;
  const setFavourite = (id) => {
    // id : value => 1 :true , 2 : false
    // علشان كدة فتحتها اوبجكت فوق
    // سبريد اوبريتور علشان اجيب القيم اللي موجودة حاليا
    const newIsFilled = { ...isFilled, [id]: !isFilled[id] };
    setIsFilled(newIsFilled);

    dispatch(
      setFavourite_action(
        fav == "isFavourite" ? "isNotFavourite" : "isNotFavourite"
      )
    );
  };



  return (
    <>
      <div className="card" style={{ width: "18rem", position: "relative" }}>
        <img src={props.img} alt="Card" />

        <div
          onClick={() => setFavourite(props.id)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "24px",
            cursor: "pointer",
            color: "gold",
          }}
        >
          {isFilled[props.id] ? <FaStar /> : <FaRegStar />}
        </div>

        <div className="card-body">
          <p className="card-text">{props.name}</p>
          {/* <p>fav count: {counter}</p> */}
          {props.path && (
            <Link to={props.path} className="btn btn-primary">
              Details
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
