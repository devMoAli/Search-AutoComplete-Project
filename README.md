# Search-AutoComplete-Project

![Search-AutoComplete-Project](Search-AutoComplete.gif)


project first part is to set the state and effect like this
import React, { useEffect, useState } from "react";
import "./styles.css";

export default function SeachAutoComplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      console.log(data);

      if (data && data.users & data.users.length) {
        setUsers(data.users);
        setLoading(false);
        setError(null);
     } else {
        throw new Error("No users found");
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }
  useEffect(() => {
    fetchListOfUsers();
  }, []);

  return (
    <div className="search-autocomplete-container">
      <input name="search-users" placeholder="Search-Users..." />
    </div>
  );
}

then now when we type anything we need to fetch data from users and autocomplete the search which is the second part

Our Logic could be Filter on users First name instead of search in full users objects we can target users first name which will be more faster and efficient

so we can change this line of code to be more specific on first name only instead of all data

  if (data && data.users & data.users.length) {
        setUsers(data.users);

so we could do it this way when we set data

setUsers(data.users.map((userItem)=>userItem.firstName.toLowerCase()));

now if u log users you can see it fetches users first names 

now we have to work on onChange functionality 
let’s have a state of search
  const [searchParam, setSearchParam] = useState('');

then pass it to input value

      <input value= {searchParam} name="search-users" placeholder="Search-Users..." />



now we need to have a drop down area to show the matching search results to users while typing 

for that we need two states for the dropDown
 const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  

now let’s add handleChnage function to input and create this function

  <input
      onChange={handleChange}
        value={searchParam}
        name="search-users"
        placeholder="Search-Users..."
      />
    </div>

now creating the function 
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

now let’s create another component called suggestions to receive the data from parent component which is SearchAutoComplete 
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

now in SearchAutoComplete return we check if showDropdown is true so show the suggestions like that and don’t forget to import it


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

      {showDropdown && <Suggestions data={filteredUsers} />}
      {error && <p>{error}</p>}
    </div>
  );
}
now to choose the value from filtered users let’s create handleClick method for that
  function handleClick(event){
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
        setUsers(data.users.map((userItem) => userItem.firstName.toLowerCase()));
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

      {showDropdown && <Suggestions handleClick={handleClick} data={filteredUsers} />}
      {error && <p>{error}</p>}
    </div>
  );
}



and pass it to Suggestions component

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
