import React from 'react'
import ImageCarousel from './ImageCarousel'
import AllMovies from './AllMovies'

function Movie() {
  return (
    <div>
      <ImageCarousel/>
      <h2 className='text-center my-3'>Latest Release</h2>
      <div className="container text-center  bg-danger text-white">
        <h2>All Movies</h2>
      </div>
      <AllMovies/>
    </div>
  )
}

export default Movie
