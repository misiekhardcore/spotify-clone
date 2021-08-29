import React from "react";
import "../styles/_login.scss";
import LoginButton from "./LoginButton/LoginButton";
import useAuth from "../../../api/useAuth";

const Login = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  useAuth(code);
  return (
    <div className="login">
      <LoginButton>Login</LoginButton>
    </div>
  );
};

export default Login;
