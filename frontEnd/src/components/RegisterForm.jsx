import { useState } from "react";
import "./css/Register.css";
import Input from "./common/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    userName: "",
    mobileNo: "",
    countryCode: "",
    userEmail: "",
    password: "",
    gender: "",
    dob: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        registerData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="register-form">
      <div className="title">
        <h2>Sign Up form</h2>
      </div>
      <div className="content">
        <label>userName:</label>
        <Input
          name="userName"
          value={registerData.userName}
          handleChange={handleChange}
        />

        <label>email:</label>
        <Input
          name="userEmail"
          value={registerData.userEmail}
          handleChange={handleChange}
        />
        <label>password:</label>
        <Input
          type="password"
          name="password"
          value={registerData.password}
          handleChange={handleChange}
        />
        <div className="phoneNumber-container">
          <div className="countryCode-container">
            <label>countryCode:</label>

            <Input
              name="countryCode"
              value={registerData.countryCode}
              handleChange={handleChange}
            />
          </div>
          <div className="mobileNo-container">
            <label>phoneNumber:</label>
            <Input
              name="mobileNo"
              value={registerData.mobileNo}
              handleChange={handleChange}
            />
          </div>
        </div>

        <label>gender:</label>
        <select
          name="gender"
          value={registerData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">other</option>
        </select>

        <label>dob:</label>
        <Input
          type="Date"
          name="dob"
          value={registerData.dob}
          handleChange={handleChange}
        />
      </div>
      <div className="common-register-login-button">
        <Link to="/">
          <button className="common-child-button">Home</button>
        </Link>
        <button className="common-child-button" onClick={handleSignUp}>
          Sign Up
        </button>
        <Link to="/login">
          <button className="common-child-button">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
