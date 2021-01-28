import React from 'react'
import { auth } from '../firebase'
import styled from 'styled-components'


const Nav = () => {

    const signOut = () => {
        auth.signOut()
    }

    return (
        <MyNav>
            <h2>Water My Plants</h2>
            <Button onClick={signOut}>Sign Out</Button>
        </MyNav>
    )
}

export default Nav

const MyNav = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: space-between;
    background-color: #ccc;
    padding: 1rem;
`
const Button = styled.button`
    justify-self: end;
    align-self: center;
`