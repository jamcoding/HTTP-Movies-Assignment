import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const UpdateMovie = props => {
    const [update, setUpdate] = useState(initialMovie)

    useEffect(() => {
        const updatedMovie = props.movies.find(movie => {
            return `${movie.id}` === props.match.params.id;
        });

        console.log(updatedMovie);

        if(updatedMovie) {
            setUpdate(updatedMovie);
        }
    }, [props.movies, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
      };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/${update.id}`, update)
            .then(response => {
                console.log('response', response);
                props.updateItems(response.data);
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSumbit={handleSubmit}>
                <input
                    type="text" 
                    name="title" 
                    onChange={changeHandler}
                    placeholders="title"
                    value={update.title}
                />
                <input
                    type="text" 
                    name="director" 
                    onChange={changeHandler}
                    placeholders="director"
                    value={update.director}
                />
                <input
                    type="number" 
                    name="metascore" 
                    onChange={changeHandler}
                    placeholders="metascore"
                    value={update.metascore}
                />
                <input
                    type="text" 
                    name="stars" 
                    onChange={changeHandler}
                    placeholders="star(s)"
                    value={update.stars}
                />
                <button className='update-movie-button'>Update</button>
            </form>
        </div>
    )
};

export default UpdateMovie;