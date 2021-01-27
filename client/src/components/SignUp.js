import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'

const SignUp = () => {

    const history = useHistory()
    

    const initialState = {
        email: '',
        password: ''
    }

    const [user, setUser] = useState(initialState)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(user.email,user.password)
        .then(setUser(initialState))
        .then(history.push('/'))
        .catch(err => alert(err.message))
    }


    return (
        <Form onSubmit={onSubmit}>
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
                variant='outlined'
            >
                Sign Up
            </Button>
        </Form>
    )
}

export default SignUp

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #555;
    border-radius: 5px;
    max-width: 300px;
    padding: 1rem;
    gap: .25rem;
    justify-self: center;
`