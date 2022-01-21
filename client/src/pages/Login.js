import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/books");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <Button className="login-btn" variant="dark" type="submit">
          Login
        </Button>
      </form>
      <a className="sign-up" href="/register">
        First time user? Create new account.{" "}
      </a>
    </div>
  );
};

export default Login;
