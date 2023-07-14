import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-dark border-bottom border-bottom-dark">
        <div className="container-fluid navbar-brand">
          <Link className="navbar-brand text-white" to="/">
            <i className="fa fa-film mx-2"></i>
            <b>MovieMate</b>
          </Link>
          <SearchBar />
          <div>
            <Link className="navbar-brand text-white my-2" to="/">
              Movies
            </Link>
            <Link className="navbar-brand text-white my-2" to="/admin">
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
