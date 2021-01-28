import { Button } from '@material-ui/core'
import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const Homepage = () => {

    const history = useHistory()

    return (
        <Wrapper>
            <h1>I'm the homepage</h1>
            <Button variant='contained' onClick={() => history.push('/dashboard')}>Go to Dashboard</Button>
        </Wrapper>
    )
}

export default Homepage

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 1rem;
    justify-items: center;
`