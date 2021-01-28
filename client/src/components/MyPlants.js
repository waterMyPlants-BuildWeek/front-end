import React, { useState, useEffect} from 'react'
import { db } from '../firebase'
import PlantCard from './PlantCard'
import styled from 'styled-components'

const MyPlants = ({uid}) => {

    const [plants, setPlants] = useState([])

    useEffect(() => {
        db.collection('plants').where("user", "==", uid).onSnapshot(snapshot => 
            {
                let data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
                setPlants(data)
            })
    },[])

    return (
        <>
            <Heading>My Plants</Heading>
            <Plants>
                {plants.map(plant => 
                    <PlantCard key={plant.id}
                        {...plant}
                    />
                )}
            </Plants>
        </>
    )
}

export default MyPlants

const Heading = styled.h2`
    font-size: 1.8rem;
    margin: 0;
    @media (max-width: 600px){
        text-align: center;  
    }
`

const Plants = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
    gap: 1rem;
    @media (max-width: 600px){
        justify-content: center;    
    }
`