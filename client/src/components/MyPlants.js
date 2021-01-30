import React from 'react'
import PlantCard from './PlantCard'
import styled from 'styled-components'

const MyPlants = ({plants, getPlants}) => {

    return (
        <>
            <Heading>My Plants</Heading>
            <Plants>
                {plants.map(plant => 
                    <PlantCard 
                        key={plant.id}
                        {...plant}
                        getPlants={getPlants}
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