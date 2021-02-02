import React from 'react'
import PlantCard from './PlantCard'
import styled from 'styled-components'
import EditPlant from './EditPlant'

const MyPlants = ({plants, getPlants}) => {

    return (
        <>
        <EditPlant />
            <Heading>My Plants</Heading>
            <Plants>
                {plants.plants.map(plant => 
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
  text-shadow: 0 0 1 white;
  font-size: 1.8rem;
  margin: 3rem auto;
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Plants = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
  gap: 1rem;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;
