import React, { useEffect, useState } from "react";
import "./styles.css";
import Suggestions from "./suggestions";

export default function SeachAutoComplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setFilteredUsers([]);
      setShowDropdown(false);
    }
  }
  function handleClick(event) {
    // console.log(event.target.innerText);
    setShowDropdown(false);
    setSearchParam(event.target.innerText);
    setFilteredUsers([]);
  }
  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      // console.log(data);

      if (data && data.users && data.users.length) {
        setUsers(
          data.users.map((userItem) => userItem.firstName.toLowerCase())
        );
        setLoading(false);
        setError(null);
      } else {
        throw new Error("No users found");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <input
          onChange={handleChange}
          value={searchParam}
          name="search-users"
          placeholder="Search-Users..."
        />
      )}

      {showDropdown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
