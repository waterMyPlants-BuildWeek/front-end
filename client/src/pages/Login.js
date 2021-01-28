import React from 'react'
import LoginForm from '../components/LoginForm'
import styled from 'styled-components'

const Login = () => {
    return (
        <Wrapper>
            <LoginForm />
        </Wrapper>
    )
}

export default Login

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: .5rem;
    justify-items: center;
`