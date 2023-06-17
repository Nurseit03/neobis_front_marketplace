import axios from "axios";

const BASE_URL = "http://165.227.174.143:8000/";

export default axios.create({
    baseURL: BASE_URL,  
    headers: {
      "Content-Type": "application/json"
    }
  });


