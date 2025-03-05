import { useState } from "react";
import Input from "./common/Input";
import { Link, useNavigate } from "react-router-dom";
import "./common/common.css";
import "./css/Login.css";

import axios from "axios";
const Login = ({ setIsLoggedIn }) => {
  const [loginDetails, setLoginDetails] = useState({
    userEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        loginDetails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login-form">
      <div className="title">
        <h2>Login</h2>
      </div>
      <div className="content">
        <label>Email:</label>
        <Input
          name="userEmail"
          value={loginDetails.email}
          handleChange={handleChange}
        />
        <label>Password:</label>
        <Input
          type="password"
          name="password"
          value={loginDetails.password}
          handleChange={handleChange}
        />
      </div>
      <div className="common-register-login-button">
        <Link to="/">
          <button className="common-child-button">Home</button>
        </Link>
        <button className="common-child-button" onClick={handleLogin}>
          Login
        </button>
        <Link to="/register">
          <button className="common-child-button">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
