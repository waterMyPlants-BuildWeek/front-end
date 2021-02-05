import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import { userLogin } from "../actions/userLogin";
import signUpSchema from "./signUpSchema";
import loginSchema from "./loginSchema";
import initialFormErrors from "./initialFormErrors";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";

const LoginForm = () => {
  const history = useHistory();

  const { dispatch } = useContext(AuthContext);

  const initialState = {
    username: "",
    password: "",
    email: "",
  };

  //   const formData = {};

  const [user, setUser] = useState(initialState);
  const [login, setLogin] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [formErrors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const [backendError, setBackendError] = useState()

  //helper functions
  //Form Validation Feature
  //validate whether form matches schema
  const validateChange = (e) => {
    //allows react to keep the event object to play nicely with the async
    e.persist();
    //reach allows us to check a specific value of schema
    if (login) {
      console.log(loginSchema, "login");
      yup
        .reach(loginSchema, e.target.name)
        .validate(e.target.name)
        .then((valid) => {
          //logs validation truthiness
          console.log(valid);
          setErrors({
            ...formErrors,
            [e.target.name]: "",
          });
        })
        .catch((error) => {
          setErrors({ ...formErrors, [e.target.name]: error.errors[0] });
          console.log({ error });
        });
    } else {
      console.log(signUpSchema, "signup");
      yup
        .reach(signUpSchema, e.target.name)

        .validate(e.target.name)
        .then((valid) => {
          //logs validation truthiness
          console.log(valid);
          setErrors({
            ...formErrors,
            [e.target.name]: "",
          });
        })
        .catch((error) => {
          setErrors({ ...formErrors, [e.target.name]: error.errors[0] });
          console.log({ error });
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateChange(e);
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  useEffect(() => {
    loginSchema.isValid(user).then((valid) => setDisabled(!valid));
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFetching(true);
    if (login) {
      axios
        .post("https://water-my-plants-tt101.herokuapp.com/users/login", user)
        .then(({ data }) => {
          dispatch(userLogin(data));
          setUser(initialState);
          history.push("/dashboard");
          setFetching(false);
        })
        .catch((err) => {
          const backError = err.response.data.message;
          setBackendError(backError)
          console.log(backError, "sign in error from the api");
        });
    } else {
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
        .catch((err) => {
          alert('Please Provide a Valid Username, Email, and Password or Return to the Sign in Page to Create an Account')
          const backError = err.response.data.message;
          setBackendError(backError)
          console.log(backError, "sign in error from the api");
        });
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
        <h6 style={{textAlign: 'center', color: 'red'}}>{backendError}</h6>
        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
          style={{ color: "white" }}
        >
          {login ? "Login" : "Sign Up"}
        </Button>
        {fetching ? <LinearProgress color="secondary" /> : <></>}
      </Form>
      <Button
        className="btn btn-three"
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
