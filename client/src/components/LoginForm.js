import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import axios from 'axios'

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

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     if(login){
    //         auth.signInWithEmailAndPassword(user.email,user.password)
    //             .then(setUser(initialState))
    //             .then(history.push('/dashboard'))
    //             .catch(err => alert(err.message))
    //     } else {
    //         auth.createUserWithEmailAndPassword(user.email,user.password)
    //             .then(setUser(initialState))
    //             .then(history.push('/dashboard'))
    //             .catch(err => alert(err.message))
    //     }
    // }


    //WITH AXIOS

    const onSubmit = (e) => {
        e.preventDefault()
        if(login){
            axios.post('https://water-my-plants-tt101.herokuapp.com/users/login', user)
            .then(res => {
                localStorage.setItem('userToken', res.data.token)
                console.log(res.data)
                setUser(initialState)
            })
            .then(history.push('/dashboard'))
        } else {
            axios.post('https://water-my-plants-tt101.herokuapp.com/users/register', user)
            .then(res => {
                localStorage.setItem('userToken', res.data.token);
                console.log(res.data)
                setLogin(!login)
            })
            .then(history.push('/login'))

        }
    }


    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>{login ? 'Login' : 'Sign Up'}</h2> 
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
                {login ? 'Login' : 'Sign Up'}
            </Button>
        </Form>
        <Button color='secondary' size='small' variant='contained' onClick={()=> setLogin(!login)}>{login ? 'Go to Sign Up' : 'Go to Log In'}</Button>
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