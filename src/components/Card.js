import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <>
      <div className="card my-2" style={{width:"18rem"}}>
        <img src={props.movie.posterUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.movie.title}</h5>
          <p className="card-text">
            {props.movie.description?props.movie.description.slice(0,72):""}...
            
          </p>
          <Link to="/" className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
