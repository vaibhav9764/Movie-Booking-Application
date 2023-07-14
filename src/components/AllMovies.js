import React, { useEffect, useState } from "react";
import Card from "./Card";

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const getAllMovies = async (e) => {
    // e.preventDefault();
    // Api Call

    const response = await fetch(
      "http://localhost:5000/api/movies/getallmovies",
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const movies = await response.json();
    console.log(movies);
    return movies;
  };

  useEffect(async () => {
    const movies=await getAllMovies();
    setMovies(movies);
  }, []);
  return (
    <div className="container">
      <div className="row">
        {/* {movies.map((element) => {
          return (
            // <div key={element._id} className="col-md-4">
            //   <Card />
            // </div>
            <Card/>
          );
        })} */}
        {Array.isArray(movies)
          ? movies.map((element) => {
              return (
                <div key={element._id} className="col-md-4">
                  <Card movie={element}/>
                </div>
              );
            })
          : null}
          {console.log(movies)}
      </div>
    </div>
  );
}

export default AllMovies;
