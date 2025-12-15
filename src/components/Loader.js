import React from "react";
import "./Loader.css";

export default function Loader({ text = "جاري التحميل..." }) {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}
