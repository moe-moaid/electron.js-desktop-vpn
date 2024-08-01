import React, { createContext, useContext, useState, useEffect } from "react";
// import { getCurrentUser, login, logout, signup } from "../authServices";
import api from "../api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null); // Message state

  useEffect(() => {
    const user = isLoggedIn();
    setUser(user);
  }, []);

  const isLoggedIn = () => {
    try {
      const token = localStorage.getItem("p-vpnToken");
      if (token) {
        return jwtDecode(token);
      }
      return null;
    } catch (err) {
      console.log("Error Decoding Token:: ", err);
      return null;
    }
  };

  const getUser = async (token) => {
    try {
      var response = await api.get("/user-data");
      const user_info = response.data.data;
      console.log("user_info:: ", user_info);
      if (response.data.code === 200) {
        const user = {
          name: user_info.name,
          email: user_info.email,
          hasPackage: user_info.user_package ? true : false,
          expiry_date: user_info.user_package.expiry_date,
          package_name: user_info.user_package.package.name,
          package_price: user_info.user_package.package.price,
        };
        return { status: true, user: user };
      } else {
        return {
          status: false,
          message: response.data.status,
          code: response.data.code,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Something went wrong , Please try again or contact support",
        code: error.status,
      };
    }
  };

  const loginUser = async (formData) => {
    try {
      var response = await api.post("/login", formData);
      const { token } = response.data;
      localStorage.setItem("p-vpnToken", token);
      const decodedUser = jwtDecode(token);
      console.log(decodedUser);
      setUser(decodedUser);
      if (response.data.code === 200) {
        return { status: true, data: jwtDecode(token) };
      } else if (response.data.code === 400) {
        console.log(response);
        return {
          status: false,
          message: response.data.data.email[0],
          code: response.data.code,
        };
        // Invalid password code 404
      } else if (response.data.code === 404) {
        return {
          status: false,
          message: response.data.message,
          code: response.data.code,
        };
        // Unverified Email code 404
      } else if (response.data.code === 401) {
        return {
          status: false,
          message: response.data.message,
          code: response.data.code,
        };
      } else {
        return {
          status: false,
          message: response.data.message,
          code: response.data.code,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Something went wrong , Please try again or contact support",
        code: error.status,
      };
    }
  };

  const signupUser = async (formData) => {
    try {
      var response = await api.post("/register", formData);
      if (response.data.code === 200) {
        return { status: true, message: response.data.message };
      } else if (response.data.code === 400) {
        return { status: false, message: response.data.data.email[0] };
      } else {
        return {
          status: false,
          message: "Unexpected error Occured, Please try again",
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "something went wrong, please try again",
      };
    }
  };

  const verifyOtp = async (formData) => {
    try {
      var response = await api.post("/verify-otp", formData);
      if (response.data.code === 200) {
        return { status: true, message: response.data.message };
      } else if (response.data.code === 409) {
        return { code: 409, status: false, message: response.data.message };
      } else {
        return {
          status: false,
          message: "Unexpected error occured, please try again",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "something went wrong, please try again",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("p-vpnToken");
    localStorage.removeItem("user");
    setUser(null);
    setMessage({ type: "success", text: "Logout successful!" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        signupUser,
        verifyOtp,
        logoutUser,
        message,
        setMessage,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
