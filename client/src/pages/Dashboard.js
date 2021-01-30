import React, { useContext, useState } from 'react'
import AddPlantForm from '../components/AddPlantForm'
import MyPlants from '../components/MyPlants'
import { AuthContext } from '../contexts/Auth'
import styled from 'styled-components'
import { Button, Dialog } from '@material-ui/core'

const Dashboard = () => {

    const { currentUser } = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Wrapper>
            
            <div className='d-flex flex-column' style={{backgroundColor: 'white', padding: '1rem 1rem', marginTop: '3rem'}}>
                <h2>Account: <h4>{currentUser.email}</h4></h2>
                
            <MyButton 
                variant='contained'
                color='primary'
                onClick={handleClickOpen}
            >
                Add a Plant
            </MyButton></div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='Add a Plant'>
                <AddPlantForm setOpen={setOpen}/>
            </Dialog>
            <MyPlants uid={currentUser.uid} />
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