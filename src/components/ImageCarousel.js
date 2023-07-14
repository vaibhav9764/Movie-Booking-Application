import React from "react";
import "./ImageCarousel.css";



function ImageCarousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div
          className="carousel-item active"
          style={{ width: "100vw", padding: "0px 0px 0px 16%" }}
        >
          <img
            src="https://m.media-amazon.com/images/M/MV5BNTlmNDMzOWQtYzg4Ny00OWQ0LWFhN2MtNmQ2MDczZGZhNTU5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
            className="poster d-block"
            alt="..."
          />
        </div>
        <div
          className="carousel-item "
          style={{ width: "100vw", padding: "0px 0px 0px 16%" }}
        >
          <img
            src="https://m.media-amazon.com/images/M/MV5BMDEyNjA0MWItY2IxMi00YTZjLTkxOGItNWIwOGQ2OTZmNTg2XkEyXkFqcGdeQXVyMTYyNjAzOTUx._V1_SX300.jpg"
            className="poster d-block"
            alt="..."
          />
        </div>
        <div
          className="carousel-item "
          style={{ width: "100vw", padding: "0px 0px 0px 16%" }}
        >
          <img
            src="https://m.media-amazon.com/images/M/MV5BMmZiN2VmMjktZDE5OC00ZWRmLWFlMmEtYWViMTY4NjM3ZmNkXkEyXkFqcGdeQXVyMTI2MTc2ODM3._V1_SX300.jpg"
            className="poster d-block"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="prev" aria-hidden="true">
          <i class="fa fa-chevron-left"></i>
        </span>
        <span className="visually-hidden ">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="nex" aria-hidden="true">
          <i class="fa fa-chevron-right"></i>
        </span>
        <span className="visually-hidden ">Next</span>
      </button>
    </div>
  );
}

export default ImageCarousel;
