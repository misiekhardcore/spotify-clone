import React from "react";
import "./_divideHeader.scss";

const DivideHeader = ({ text = "" }) => {
  return (
    <div className="divideheader">
      <h2>{text}</h2>
      <span />
    </div>
  );
};

export default DivideHeader;
