import React, { useContext, useState, useEffect, useCallback } from 'react'
import AddPlantForm from '../components/AddPlantForm'
import MyPlants from '../components/MyPlants'
import { AuthContext } from '../contexts/Auth'
import styled from 'styled-components'
import { Button, Dialog } from '@material-ui/core'
import { getUserPlants } from '../api/getUserPlants'
import { PlantContext } from '../contexts/Plants'
import { getPlantsAction } from '../actions/getPlantsAction'
import EditUser from '../components/EditUser'
import { editingUser } from '../actions/editingUser'


const Dashboard = () => {

    const { state, dispatch } = useContext(AuthContext)
    const { plants, plantDispatch} = useContext(PlantContext)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const getPlants = useCallback(async () => {
        const results = await getUserPlants(state.user.userId)
        plantDispatch(getPlantsAction(results))
    },[state.user, plantDispatch])

    useEffect(() => {
        getPlants()
    },[getPlants])

    return (
        <Wrapper>
            
            <div className='d-flex flex-column' style={{backgroundColor: 'white', padding: '1rem 1rem', marginTop: '3rem'}}>
                <h2>Account:</h2> 
                    <h6>Username: {state.user.username}</h6>
                    <h6>Email: {state.user.email}</h6>
                    <Button variant='outlined' onClick={()=>dispatch(editingUser())}>
                        {state.editingUser 
                        ? 'Cancel Editing'
                        : 'Edit User Details'
                        }
                        </Button>
      
            <MyButton 
                variant='contained'
                color='primary'
                onClick={handleClickOpen}
            >
                Add a Plant
            </MyButton></div>
            <EditUser />
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
    gap: 2rem;
`

const MyButton = styled(Button)`
    justify-self: start;
`