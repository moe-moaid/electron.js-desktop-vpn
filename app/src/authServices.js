import api from "./api";
import { jwtDecode } from "jwt-decode";

// export const login = async (formData) => {
//   try {
//     var response = await api.post("/login", formData);
//     const { token } = response.data;
//     localStorage.setItem("token", token);
//     // console.log(response.data);
//     return { status: "success", data: jwtDecode(token) };
//   } catch (error) {
//     // invalid Password
//     if (response.data.code === 400) { // Invalid Email
//       console.log(response.data.data.email[0]);
//       return { status: "error", message: response.data.data.email[0], code: error.status };
//     } else if (response.data.code === 404) { // Invalid password
//       return { status: "error", message: response.data.message, code: error.status };
//     }else if (response.data.code === 401) { // Invalid password
//       return { status: "error", message: response.data.message, code: error.status };
      
//     }
//     else {
//       return { status: "error", message: error.message, code: error.status };
//     }
//   }
// };

// export const signup = async (formData) => {
//   try {
//     const response = await api.post("/register", formData);
//     if (response.data.code === 200) {
//       return { status: "success", message: response.message, value: true };
//     } else {
//       return { status: "error", message: response.data.message, value: false };
//     }
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return {
//       status: "error",
//       message: error.response.data.message,
//       code: error.response.status,
//       data: error.response.data.data,
//     };
//   }
// };

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token);
    }
    return null;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};
