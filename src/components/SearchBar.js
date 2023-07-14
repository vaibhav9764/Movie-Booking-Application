import React, { useState } from "react";
import data from "../temp";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");


   
  const handleOnChange = (e) => {
    
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div>
          <input
            type="text"
            id="searchInput"
            placeholder="Search Movie"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </div>

      </div>
    </>
  );
}

export default SearchBar
