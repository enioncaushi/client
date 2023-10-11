import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PetList.css'

const PetList = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                const sortedPets = res.data.sort((a, b) => a.type.localeCompare(b.type));
                setPets(sortedPets);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="nav">
            <h1>Pet Shelter</h1>
            <Link to="/pets/new">Add a pet to the shelter</Link>
            </div>
            <div className="form-group">
            <h2>These pets are looking for a good home</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, index) => (
                        <tr key={index}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <Link to={`/pets/${pet._id}`}>Details</Link> | 
                                <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default PetList;