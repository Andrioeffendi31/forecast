import {
  FETCH_FORECAST,
  FETCH_FORECAST_ERROR,
  FETCH_FORECAST_SUCCESS,
} from "../constants/types";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORECAST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        ),
        location: action.payload.city.name.concat(
          ", ",
          action.payload.city.country
        ),
      };
    case FETCH_FORECAST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
