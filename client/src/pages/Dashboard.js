import React, { useContext, useState, useEffect } from 'react'
import AddPlantForm from '../components/AddPlantForm'
import MyPlants from '../components/MyPlants'
import { AuthContext } from '../contexts/Auth'
import styled from 'styled-components'
import { Button, Dialog } from '@material-ui/core'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Dashboard = () => {

    // const { currentUser } = useContext(AuthContext)
    // const [open, setOpen] = useState(false)

    // const handleClickOpen = () => {
    //     setOpen(true)
    // }

    // const handleClose = () => {
    //     setOpen(false)
    // }

    useEffect(()=> {
        axiosWithAuth().get('https://water-my-plants-tt101.herokuapp.com/plants/')
        .then((res) => { 
            console.log(res.data)
        })
        .catch(err => console.log(err.message))
    })

    return (
        <Wrapper>
            <div>
                <h2>Your Details</h2>
                {/* <h4>{currentUser.email}</h4> */}
            </div>
            {/* <MyButton 
                variant='contained'
                color='primary'
                onClick={handleClickOpen}
            >
                Add a Plant
            </MyButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby='Add a Plant'>
                <AddPlantForm setOpen={setOpen}/>
            </Dialog>
            <MyPlants uid={currentUser.uid} /> */}
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