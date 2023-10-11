import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './PetForm.css'; 

const PetForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/pets", {
        name,
        type,
        description,
        skill1,
        skill2,
        skill3
      })
      .then((res) => {
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.errors.name && err.response.data.errors.name.kind === "unique") {
          setValidation({
            ...err.response.data.errors,
            name: { message: "Name must be unique" }
          });
        } else {
          setValidation(err.response.data.errors);
        }
      });
  };

  return (
    <div className="container">
      <div className="nav">
        <h1>Pet Shelter</h1>
        <button onClick={() => navigate("/")}>back to home</button>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          {validation.name ? (
            <p className="validation-message">{validation.name.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="name">Pet Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.type ? (
            <p className="validation-message">{validation.type.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="type">Pet Type:</label>
          <input type="text" onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.description ? (
            <p className="validation-message">{validation.description.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="description">Pet Description:</label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Skill 1:</label>
          <input type="text" onChange={(e) => setSkill1(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Skill 2:</label>
          <input type="text" onChange={(e) => setSkill2(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Skill 3:</label>
          <input type="text" onChange={(e) => setSkill3(e.target.value)} />
        </div>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};
export default PetForm;