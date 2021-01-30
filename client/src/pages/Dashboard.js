import React, { useContext, useState, useEffect, useCallback } from 'react'
import AddPlantForm from '../components/AddPlantForm'
import MyPlants from '../components/MyPlants'
import { AuthContext } from '../contexts/Auth'
import styled from 'styled-components'
import { Button, Dialog } from '@material-ui/core'
import { getUserPlants } from '../api/getUserPlants'
import { PlantContext } from '../contexts/Plants'
import { getPlantsAction } from '../actions/getPlantsAction'


const Dashboard = () => {

    const { state } = useContext(AuthContext)
    const { plants, dispatch} = useContext(PlantContext)
    const [open, setOpen] = useState(false)
    // const [plants, setPlants] = useState([])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const getPlants = useCallback(async () => {
        const results = await getUserPlants(state.user.userId)
        dispatch(getPlantsAction(results))
    },[state.user, dispatch])

    useEffect(() => {
        getPlants()
    },[getPlants])

    return (
        <Wrapper>
            <div>
                <h2>Your Details</h2>
                <h4>{state.user.username}</h4>
                <h4>{state.user.email}</h4>
            </div>
            <MyButton 
                variant='contained'
                color='primary'
                onClick={handleClickOpen}
            >
                Add a Plant
            </MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby='Add a Plant'>
                <AddPlantForm setOpen={setOpen} getPlants={getPlants}/>
            </Dialog>
            <MyPlants plants={plants} getPlants={getPlants}/>
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

const MyButton = styled(Button)`
    justify-self: start;
`