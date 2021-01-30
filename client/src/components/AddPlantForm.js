import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState, } from "react";
import { AuthContext } from "../contexts/Auth";
import styled from "styled-components";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";
import schema from "./schema.js";

const AddPlantForm = ({ setOpen }) => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
    console.log(schema)

  const initialForm = {
    user: currentUser.uid,
    nickname: "",
    species: "",
    h2oFrequency: "Daily",
    image: "",
  };

  const [plant, setPlant] = useState(initialForm);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    // //submit disable feature
   


    setPlant({
      ...plant,
      [e.target.name]: e.target.value,
    });
  };

  const frequency = [
    { title: "Daily", value: 1 },
    { title: "Every other day", value: 2 },
    { title: "Weekly", value: 7 },
    { title: "Bi-Weekly", value: 14 },
  ];

  const onFileChange = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const fileRef = storage.ref(`images/${file.name}`);
    await fileRef.put(file);
    setPlant({
      ...plant,
      image: await fileRef.getDownloadURL(),
    });
    setUploading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    db.collection("plants").add(plant);
    setPlant(initialForm);
    history.push("/dashboard");
    setOpen(false);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Heading>Add a Plant</Heading>
        <TextField
          label="Plant Nickname"
          name="nickname"
          value={plant.nickname}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Plant Species"
          name="species"
          value={plant.species}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
        />
        <InputLabel id="frequency">Water Frequency</InputLabel>
        <Select
          labelId="frequency"
          id="frequency"
          name="h2oFrequency"
          value={plant.h2oFrequency}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
        >
          {frequency.map((item) => (
            <MenuItem value={item.title}>{item.title}</MenuItem>
          ))}
        </Select>
        <InputLabel id="image">
          Plant Image
          <Upload id="image" type="file" onChange={onFileChange} />
        </InputLabel>
        <Button
          disabled={uploading}
          type="submit"
          color="primary"
          variant="contained"
        >
          Add Plant
        </Button>
      </Form>
    </>
  );
};

export default AddPlantForm;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  @media (max-width: 600px) {
    text-align: center;
  }
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid #555;
  border-radius: 5px;
  max-width: 350px;
  padding: 2rem;
  gap: 0.75rem;
  & h2 {
    text-align: center;
  }
`;

const Upload = styled(Input)`
  padding: 1rem 0;
`;
