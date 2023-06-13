import axios from "axios";

const BASE_URL = "http://34.159.48.221/auth";

export default axios.create({
    baseURL: BASE_URL,  
    headers: {
      "Content-Type": "application/json"
    }
  });


