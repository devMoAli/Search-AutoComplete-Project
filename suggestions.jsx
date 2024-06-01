import React from "react";
import "./styles.css";

export default function Suggestions({ data }) {
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
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
