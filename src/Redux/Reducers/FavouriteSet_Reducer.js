const INITIAL_VALUE = {
  Favourites: [],
};

export default function Favourite_Reducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "SET_FAVOURITE":
      const moviePayload = action.payload;
      if (!moviePayload || typeof moviePayload.id === "undefined") {
        console.warn("SET_FAVOURITE action received without valid payload id");
        return state;
      }

      const existingIndex = state.Favourites.findIndex(
        (movie) => movie.id === moviePayload.id
      );
      const shouldBeFavourite = moviePayload.isFavourite; 

      if (existingIndex >= 0 && !shouldBeFavourite) {
        return {
          ...state,
          Favourites: state.Favourites.filter(
            (movie) => movie.id !== moviePayload.id
          ),
        };
      } else if (existingIndex < 0 && shouldBeFavourite) {
        const movieToAdd = {
          id: moviePayload.id,
          ...(moviePayload.movieDetails || {}), 
        };
        return {
          ...state,
          Favourites: [...state.Favourites, movieToAdd],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
