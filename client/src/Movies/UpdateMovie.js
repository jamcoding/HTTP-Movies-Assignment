import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
    console.log('props', props);
    const [item, setItem] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.log('error', error);
            })
    }, [props.match.params.id]);

    const changeHandler = e => {
        setItem({
          ...item,
          [e.target.name]: e.target.value
        });
      };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/${item.id}`, item)
            .then(response => {
                console.log('put response', response);
                props.updateItems(response.data)
                props.history.push(`/`)
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    return (
        <div>
            <h2 className="update-form">Update Movie</h2>
            <form onSumbit={handleSubmit}>
                <input
                    type="text" 
                    name="title" 
                    onChange={changeHandler}
                    placeholders="title"
                    value={item.title}
                />
                <input
                    type="text" 
                    name="director" 
                    onChange={changeHandler}
                    placeholders="director"
                    value={item.director}
                />
                <input
                    type="number" 
                    name="metascore" 
                    onChange={changeHandler}
                    placeholders="metascore"
                    value={item.metascore}
                />
                <input
                    type="text" 
                    name="stars" 
                    onChange={changeHandler}
                    placeholders="Actor(s)"
                    value={item.stars}
                />
                <button className="update-form-button">Update</button>
            </form>
        </div>
    )
};

export default UpdateMovie;