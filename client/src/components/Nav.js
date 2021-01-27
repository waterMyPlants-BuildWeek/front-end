import React from 'react'
import { auth } from '../firebase'


const Nav = () => {

    const signOut = () => {
        auth.signOut()
    }

    return (
        <div>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default Nav
