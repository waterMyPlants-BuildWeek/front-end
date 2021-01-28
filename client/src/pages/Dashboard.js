import React, { useContext } from 'react'
import AddPlantForm from '../components/AddPlantForm'
import MyPlants from '../components/MyPlants'
import { AuthContext } from '../contexts/Auth'
import styled from 'styled-components'

const Dashboard = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <Wrapper>
            <div>
                <h2>Your Details</h2>
                <h4>{currentUser.email}</h4>
            </div>
            <MyPlants uid={currentUser.uid} />
            <AddPlantForm />
        </Wrapper>
    )
}

export default Dashboard

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 2rem;
`