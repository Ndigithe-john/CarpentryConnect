import { useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  function handeSerchChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }
  return (
    <form className="search_form">
      <input
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={handeSerchChange}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
