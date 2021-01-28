import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

const LoginForm = () => {

    const history = useHistory()
    
    const initialState = {
        username: '',
        email: '',
        password: ''
    }

    const [user, setUser] = useState(initialState)
    const [login, setLogin] = useState(true)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(login){
            auth.signInWithEmailAndPassword(user.email,user.password)
                .then(setUser(initialState))
                .then(history.push('/dashboard'))
                .catch(err => alert(err.message))
        } else {
            auth.createUserWithEmailAndPassword(user.email,user.password)
                .then(setUser(initialState))
                .then(history.push('/dashboard'))
                .catch(err => alert(err.message))
        }
    }


    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>{login ? 'Login' : 'Sign Up'}</h2> 
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
                {login ? 'Login' : 'Sign Up'}
            </Button>
        </Form>
        <Button color='primary' onClick={()=> setLogin(!login)}>{login ? 'Sign Up' : 'Log In'}</Button>
        </>
    )
}

export default LoginForm

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 250px;
    max-width: 300px;
    padding: 1rem;
    gap: .25rem;
    background-color: #fff;
    box-shadow: 0 0 3px rgba(0,0,0,.35);
    & h2{
        text-align: center;
    }
`