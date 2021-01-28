import React, { useState, useEffect, createContext } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)
        })
        return unsubscribe
    },[])

    if(pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
            
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}