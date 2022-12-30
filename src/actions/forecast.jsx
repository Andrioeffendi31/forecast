import * as api from "../api";
import {
  FETCH_FORECAST,
  FETCH_FORECAST_ERROR,
  FETCH_FORECAST_SUCCESS,
} from "../constants/types";

export const fetchForecast = (city) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FORECAST });

    const { data } = await api.fetchForecast(city);

    dispatch({ type: FETCH_FORECAST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_FORECAST_ERROR, payload: error.message });
  }
};
