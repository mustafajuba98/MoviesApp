const INITIAL_VALUE = {
  Favourites: [],
};

export default function Favourite_Reducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "SET_FAVOURITE":
      return {
        ...state,
        Favourites: action.payload,
      };
    default:
      return state;
  }
}
