import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./_header.scss";

export default function Header() {
  return (
    <div className="header">
      <div>
        <h1>Your favourite tunes from Huren.nl</h1>
        <h2>
          All <FontAwesomeIcon icon={faSun} /> and all{" "}
          <FontAwesomeIcon icon={faMoon} />
        </h2>
      </div>
    </div>
  );
}
