import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Button, TextField, LinearProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import { updateUser } from '../actions/updateUser'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { editingUser } from '../actions/editingUser'

const EditUser = ({setOpen}) => {

    const history = useHistory()

    const {state, dispatch} = useContext(AuthContext)
    
    const initialState = {
        userId: state.user.userId,
        username: state.user.username,
        email: state.user.email,
        password: state.user.password
    }

    const [user, setUser] = useState(initialState)
    const [fetching, setFetching] = useState(false)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        setFetching(true)
        e.preventDefault()
        axiosWithAuth().put(`https://water-my-plants-tt101.herokuapp.com/users/${state.user.userId}`, user)
            .then(({data}) => {
                console.log(user)
                dispatch(updateUser(user))
                setOpen(false)
                history.push('/dashboard')
                setFetching(false)
            })
    }


    return (
        <>
        {!state.editingUser
        ? <></>
        : <Form onSubmit={onSubmit}>
            <h3>Edit User Details</h3> 
            <TextField
                type='text'
                name='username'
                value={user.username}
                onChange={handleChange} 
                variant='outlined'
                label='username'
                margin='dense'
            />
            <TextField
                name='email'
                type='email'
                value={user.email}
                onChange={handleChange} 
                variant='outlined'
                label='email'
                margin='dense'
            />
            <TextField
                name='password'
                type='password'
                value={user.password}
                onChange={handleChange} 
                variant='outlined'
                label='password'
                margin='dense'
            />
            <Button
                type='submit' 
                variant='contained'
                color='primary'
            >
                Update Details
            </Button>
            <Button 
                variant='outlined'
                onClick={()=> dispatch(editingUser())}
            >
                Cancel Editing
            </Button>
            {
                fetching 
                ?<LinearProgress color='secondary' />
                : <></>
            }
        </Form>
        }
        </>
    )
}

export default EditUser

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