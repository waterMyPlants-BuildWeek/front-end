import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

const Homepage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <div className='title d-flex flex-column justify-content-center align-items-center'> 
        <h1>Plant Hydration</h1>
        <h3>Your Personal Plant Watering Reminder Tool</h3>
      </div>
      <Button variant="contained" onClick={() => history.push("/dashboard")}>
        Go to Dashboard
      </Button>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 2rem;
  gap: 1rem;
  justify-items: center;
`;
