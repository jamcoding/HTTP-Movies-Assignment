import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from 'react-router-dom';
import MovieCard from "./MovieCard";
import axios from "axios";

const Movie = props => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteMovie = (id) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res)
      props.history.push('/')
    })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      
      <div className="update-button">
        <Link to={`/update-movie/${movie.id}`}>Update</Link>
      </div>
      
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <br />
      <div className='delete-button' onClick={() => deleteMovie(movie.id)}>
        delete
      </div>
    </div>
  );
}
export default Movie;
