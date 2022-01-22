import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Register.css";

const Register = () => {
  //state used to grab the data from the inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState();

  //used to redirect user to a certain endpoint
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/users/register", { email, password })
      .then((res) => {
        setSuccessMessage("You have successfully signed up!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <div>
      <h1 className="title">Sign Up</h1>
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </p>
        <Button variant="dark" type="submit">
          Register
        </Button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Register;
