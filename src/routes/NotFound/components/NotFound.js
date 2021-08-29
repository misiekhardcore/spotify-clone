import React from "react";
import "../styles/_notFound.scss";
import useAuth from "../../../api/useAuth";
import { Link } from "react-router-dom";

const NotFound = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  useAuth(code);
  return (
    <div className="notfound">
      <h1>Oops, you picked the wrong way...</h1>
      <Link to="/">Go back to safe home</Link>
    </div>
  );
};

export default NotFound;
