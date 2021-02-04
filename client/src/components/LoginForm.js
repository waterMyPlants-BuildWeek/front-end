import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import { userLogin } from "../actions/userLogin";
import signUpSchema from './signUpSchema';
import initialFormErrors from './initialFormErrors';



const LoginForm = () => {
  const history = useHistory();

  const { dispatch } = useContext(AuthContext);

  const initialState = {
    username: "",
    password: "",
    email: "",
  };

  const formData = {};

  const [user, setUser] = useState(initialState);
  const [login, setLogin] = useState(true);
  const [fetching, setFetching] = useState(false);
  //const [formErrors, setErrors] = useState(initialFormErrors);
 
  //helper functions


  const handleChange = (e) => {
    
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

 console.log(initialFormErrors)

  const onSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formData);

    const isValid = await signUpSchema.isValid(formData)
    console.log(isValid)

    setFetching(true);
    if (isValid !== true){
        console.log('Your Form is Not Valid')
        alert('Please provide all information')
    }
    else if (login && isValid === true) {
        console.log('your form is valid')
      axios
        .post("https://water-my-plants-tt101.herokuapp.com/users/login", user)
        .then(({ data }) => {
          dispatch(userLogin(data));
          setUser(initialState);
          history.push("/dashboard");
          setFetching(false);
        })
        .catch((err) => console.log(err));
    } else if (isValid === true) {
        console.log('your form is valid')
      axios
        .post(
          "https://water-my-plants-tt101.herokuapp.com/users/register",
          user
        )
        .then(({ data }) => {
          dispatch(userLogin(data));
          setLogin(!login);
          history.push("/dashboard");
          setFetching(false);
        })
        .catch((err) => console.log(err.message));
    }
  };



  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>{login ? "Login" : "Sign Up"}</h2>
        <TextField
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          variant="outlined"
          label="username"
          margin="dense"
        />
        {!login ? (
          <TextField
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
            label="email"
            margin="dense"
          />
        ) : (
          <></>
        )}
        <TextField
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          variant="outlined"
          label="password"
          margin="dense"
        />
        <Button type="submit" variant="contained" color="primary">
          {login ? "Login" : "Sign Up"}
        </Button>
        {fetching ? <LinearProgress color="secondary" /> : <></>}
      </Form>
      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={() => setLogin(!login)}
      >
        {login ? "Go to Sign Up" : "Go to Log In"}
      </Button>
    </>
  );
};

export default LoginForm;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 250px;
  max-width: 300px;
  padding: 1rem;
  gap: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
  & h2 {
    text-align: center;
  }
`;
