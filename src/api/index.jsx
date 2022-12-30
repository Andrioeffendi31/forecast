import axios from "axios";

const API_KEY = "0986a72e375c77432c625a957b265633";
const ROOT_URL = "http://api.openweathermap.org/data/2.5";

export const fetchForecast = (city) =>
  axios.get(`${ROOT_URL}/forecast`, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });
