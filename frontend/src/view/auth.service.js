import axios from "axios";
class AuthService {
    login(email, password) {
      return axios
        .post("https://pint-backend.onrender.com/users/login", { email, password })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data));
            return res.data;
          } else {
            throw new Error("Invalid user");
          }
        })
        .catch((error) => {
          throw new Error("Authentication failed");
        });
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
  
  export default new AuthService();
  