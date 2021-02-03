import React, { useState, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button, TextField, Input, InputLabel, Select, MenuItem, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { PlantContext } from '../contexts/Plants';
import { getPlantsAction } from '../actions/getPlantsAction';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { storage } from '../firebase'
import { AuthContext } from '../contexts/Auth'
import { clearSelected } from '../actions/clearSelected'
import { getUserPlants } from '../api/getUserPlants'

const EditPlant = () => {

  const history = useHistory();

  const {plants, plantDispatch} = useContext(PlantContext);
  const {state} = useContext(AuthContext);

  const initialState = useMemo(() => {
    return {
    user_id: state.user.userId,
    nickname: plants.selectedPlant.nickname,
    species: plants.selectedPlant.species,
    h2oFrequency: plants.selectedPlant.h2oFrequency,
    image: plants.selectedPlant.image,
    details: plants.selectedPlant.details,
    last_watered: plants.selectedPlant.last_watered,
    id: plants.selectedPlant.id
    }
  },[plants, state.user])

   
  const [plant, setPlant] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(false)

  const handleChange = e => {
    setPlant({
        ...plant,
        [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setPlant(initialState)
  }, [initialState]) 

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

  const getPlants = async () => {
    const results = await getUserPlants(state.user.userId)
    plantDispatch(getPlantsAction(results))
  }

  const handleSubmit = e => {
    setFetching(true)
    e.preventDefault();
    axiosWithAuth()
      .put(`https://water-my-plants-tt101.herokuapp.com/plants/${plants.selectedPlant.id}`, plant)
      .then(({data}) => {
        plantDispatch(clearSelected())
        history.push('/dashboard')
        getPlants()
        setFetching(false)
    })
  }

  return (
    <>
     <></>
      <Form onSubmit={handleSubmit}>
        <h3>Edit Plant Details</h3> 
        <TextField 
          type='text'
          name='nickname'
          value={plant.nickname}
          onChange={handleChange} 
          variant='outlined'
          label='nickname'
          margin='dense'
        />
        <TextField 
          label='Plant Species'
          name='species'
          value={plant.species}
          onChange={handleChange}
          variant='outlined'
          margin='dense'
        />
        <TextField 
          label=''
          type='date'
          name='last_watered'
          value={plant.last_watered}
          onChange={handleChange}
          variant='outlined'
          margin='dense'
        />
        <InputLabel id="frequency">Water Frequency</InputLabel>
        <Select
          labelId='frequency'
          id='frequency'
          name='h2oFrequency' 
          value={plant.h2oFrequency} 
          onChange={handleChange}
          variant='outlined'
          margin='dense'
        >
          {frequency.map(item => 
            <MenuItem key={item.title} value={item.title}>{item.title}</MenuItem>    
        )}
        </Select>
        <InputLabel id='image'>Plant Image
        <Upload id='image' type='file' onChange={onFileChange} />
        </InputLabel>
        <Button
            type='submit' 
            variant='contained'
            color='primary'
        >
            Update Plant
        </Button>
        <Button 
            disabled={uploading}
            variant='outlined'
            onClick={()=> plantDispatch(clearSelected())}
        >
            Cancel Editing
        </Button>
        {
          fetching 
          ? <LinearProgress color='secondary' />
          : <></>
        }
      </Form>
      
    </>
  )

}

export default EditPlant;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 300px;
    max-width: 350px;
    padding: 2rem;
    gap: .25rem;
    background-color: #fff;
    box-shadow: 0 0 3px rgba(0,0,0,.35);
    justify-self: center;
    & h2{
        text-align: center;
    }
    & h3{
        text-align: center;
    }
`

const Upload = styled(Input)`
  padding: 1rem 0;
`;

