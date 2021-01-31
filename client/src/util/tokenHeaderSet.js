import axios from "axios";
//Checking if token is in localStorage
const tokenHeaderSet = (token) => {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
    // localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["auth-token"];
    // localStorage.removeItem("token");
  }
};

export default tokenHeaderSet;
