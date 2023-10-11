import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPet = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => {
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setSkill1(res.data.skill1 || "");
        setSkill2(res.data.skill2 || "");
        setSkill3(res.data.skill3 || "");
      })
      .catch(err => console.log(err));
  }, [id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/pets/${id}`, {
      name,
      type,
      description,
      skill1,
      skill2,
      skill3
    })
      .then(res => {
        console.log(res);
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
        <h1>Edit Pet</h1>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          {validation.name && <p className="validation-message">{validation.name.message}</p>}
          <label htmlFor="name">Pet Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.type && <p className="validation-message">{validation.type.message}</p>}
          <label htmlFor="type">Pet Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.description && <p className="validation-message">{validation.description.message}</p>}
          <label htmlFor="description">Pet Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="skills">
          <h3>Skills (optional)</h3>
          <div className="form-group">
            <label>Skill 1:</label>
            <input type="text" value={skill1} onChange={(e) => setSkill1(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Skill 2:</label>
            <input type="text" value={skill2} onChange={(e) => setSkill2(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Skill 3:</label>
            <input type="text" value={skill3} onChange={(e) => setSkill3(e.target.value)} />
          </div>
        </div>

        <button type="submit">Edit Pet</button>
      </form>
    </div>
  );
};

export default EditPet;
