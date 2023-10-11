import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PetDetails.css'

const PetDetails = () => {
    const [pet, setPet] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {setPet(res.data); 
                setLikes(res.data.likes); } )
            .catch(err => console.log(err));
    }, [id]);

    const handleAdopt = () => {
        axios.delete(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                console.log(res.data);
                navigate("/"); // Redirect to the main page after adoption
            })
            .catch(err => console.log(err));
    };

    const handleLike = () => {
        axios.put(`http://localhost:8000/api/pets/like/${id}`)
            .then(res => {
                setLikes(res.data.likes);
                setLiked(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="nav">
            <h1>Pet Shelter</h1>
            <Link to="/">back to home</Link>
            </div>
            <div className="adopt">
            <h2>Details about: {pet.name}</h2>
            <button onClick={handleAdopt}>Adopt {pet.name}</button>
            </div>
            <div className="form-group">
            <div>
                <p><strong>Pet type:</strong> {pet.type}</p>
                <p><strong>Description:</strong> {pet.description}</p>
                <p><strong>Skills:</strong></p>
                <ul>
                    {pet.skill1 && <li>{pet.skill1}</li>}
                    {pet.skill2 && <li>{pet.skill2}</li>}
                    {pet.skill3 && <li>{pet.skill3}</li>}
                </ul>
            </div>

            <button onClick={handleLike} disabled={liked}>
                Like {pet.name}
            </button>
            <p>{likes} like(s)</p>
            </div>
        </div>
    );
};

export default PetDetails;
