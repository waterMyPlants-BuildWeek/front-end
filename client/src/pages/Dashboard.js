import React, { useContext } from 'react'
import AddPlantForm from '../components/AddPlantForm'
import MyPlants from '../components/MyPlants'
import { AuthContext } from '../contexts/Auth'

const Dashboard = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <div>
            <h2>Your Details</h2>
            <h4>{currentUser.uid}</h4>
            <h4>{currentUser.email}</h4>
            <MyPlants uid={currentUser.uid} />
            <AddPlantForm />
        </div>
    )
}

export default Dashboard
