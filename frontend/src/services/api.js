import axios from "axios";

const API = axios.create({
   baseURL: "https://noteflow-backend-443x.onrender.com/api"
});

export default API;