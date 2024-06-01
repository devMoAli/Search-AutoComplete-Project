import React from "react";
import "./styles.css";

export default function Suggestions({ data, handleClick}) {
  if (!data || data.length === 0) {
    return (
      <ul>
        <li className="no-suggestions">No suggestions found</li>
      </ul>
    );
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li onClick={handleClick} key={index}>{item}</li>
      ))}
    </ul>
  );
}
