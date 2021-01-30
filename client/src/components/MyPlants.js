import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import PlantCard from "./PlantCard";
import styled from "styled-components";

const MyPlants = ({ uid }) => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    db.collection("plants")
      .where("user", "==", uid)
      .onSnapshot((snapshot) => {
        let data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPlants(data);
      });
  }, [uid]);

  return (
    <div className='d-flex flex-column'>
      <Heading>My Plants</Heading>
      <div>
        <Plants>
          {plants.map((plant) => (
            <PlantCard key={plant.id} {...plant} />
          ))}
        </Plants>
      </div>
    </div>
  );
};

export default MyPlants;

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
