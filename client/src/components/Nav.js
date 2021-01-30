import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import { logout } from '../actions/logout'
import "bootstrap/dist/css/bootstrap.css";


const Nav = () => {

    const { state, dispatch} = useContext(AuthContext)
    const history = useHistory()

    if(!state.isAuthenticated){return (
        <MyNav>
            <Logo
                variant='text'
                onClick={()=> history.push('/')}
            >Water My Plants</Logo>
            <Menu className='d-flex justify-content-evenly'>
                <Button 
                    variant='text' 
                    onClick={()=> history.push('/')}
                >
                    Home
                </Button>
                <Button
                    variant='text'
                    onClick={()=> history.push('/login')}    
                >Login</Button>
            </Menu>
        </MyNav>
    )}

    return (
        <MyNav className='d-flex align-baseline flex-column justify-content-evenly'>
            <Logo className='d-flex justify-content-end'
                variant='text'
                onClick={()=> history.push('/')}
            >Water My Plants
            </Logo>
            <Menu className='d-flex justify-content-end'>
                <Button 
                    variant='text' 
                    onClick={()=> history.push('/')}
                >
                    Home
                </Button>
                <Button
                    variant='text'
                    onClick={()=> history.push('/dashboard')}    
                >Dashboard</Button>
                <Button onClick={() => dispatch(logout())}>Sign Out</Button>
            </Menu>
        </MyNav>
    )
}

export default Nav

const MyNav = styled.div`
   display: flex
   justify-items: space-between;
    padding: 0 1rem;
    border-bottom: 1px solid #ccc;
    background-color: white;
`

const Menu = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    align-content: center;
`

const Logo = styled(Button)`
    justify-self: start;
    font-size: 1rem;
`
// const Button = styled.button`
//     justify-self: end;
//     align-self: center;
// `