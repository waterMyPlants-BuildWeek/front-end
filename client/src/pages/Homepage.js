import React from 'react'
import {useHistory} from 'react-router-dom'

const Homepage = () => {

    const history = useHistory()

    return (
        <div>
            <h1>I'm the homepage</h1>
            <button onClick={() => history.push('/dashboard')}>Go to Dashboard</button>
        </div>
    )
}

export default Homepage
