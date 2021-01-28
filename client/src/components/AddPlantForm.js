import { Button, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import styled from 'styled-components'
import { db, storage } from '../firebase'
import { useHistory } from 'react-router-dom'

const AddPlantForm = () => {

    const {currentUser} = useContext(AuthContext)
    const history = useHistory()

    const initialForm = {
        user: currentUser.uid,
        nickname: '',
        species: '',
        h2oFrequency: '',
        image: ''
    }

    const [plant, setPlant] = useState(initialForm)
    const [uploading, setUploading] = useState(false)

    const handleChange = (e) => {
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        })

    }

    const frequency = [
        {title: 'Daily', value: 1},
        {title: 'Every other day', value: 2},
        {title: 'Weekly', value: 7},
        {title: 'Bi-Weekly', value: 14}
     ]

     const onFileChange = async (e) => {
        setUploading(true)
        const file = e.target.files[0]
        const fileRef = storage.ref(`images/${file.name}`)
        await fileRef.put(file)
        setPlant({
            ...plant, 
            image: await fileRef.getDownloadURL()
        })
        setUploading(false)
    }
 

    const onSubmit = (e) => {
        e.preventDefault()
        db.collection('plants').add(plant)
        setPlant(initialForm)
        history.push('/dashboard')
    }



    return (
        <Form onSubmit={onSubmit}>
            <h2>Add a Plant</h2>
            <TextField 
                label='Plant Nickname'
                name='nickname'
                value={plant.nickname}
                onChange={handleChange}
                variant='outlined'
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
            <InputLabel id="frequency">Water Frequency</InputLabel>
            <Select
                id='frequency' 
                name='h2oFrequency' 
                value={plant.h2oFrequency} 
                onChange={handleChange}
                variant='outlined'
                margin='dense'
            >
                {frequency.map(item => 
                    <MenuItem value={item.title}>{item.title}</MenuItem>    
                )}
            </Select>
            <InputLabel id='image'>Plant Image</InputLabel>
            <Input id='image' type='file' onChange={onFileChange} />
            <Button
                disabled={uploading}
                type='submit' 
                color='primary' 
                variant='contained'
            >
                Add Plant
            </Button>
            
        </Form>
    )
}

export default AddPlantForm

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #555;
    border-radius: 5px;
    max-width: 300px;
    padding: 1rem;
    gap: .25rem;
    & h2{
        text-align: center;
    }
`