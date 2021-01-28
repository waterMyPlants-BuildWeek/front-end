import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core'
import axios from 'axios';

const authUser = {
  username: '',
  email: '',
  password: '',
}

const EditUser = () => {
  const [user, setUser] = useState(authUser);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios()
      .get(`https://water-my-plants-tt101.herokuapp.com/users/dashboard/${id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
       console.log(err)
      })
  }, [id])

  const handleChange = e => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    console.log(user);
    e.preventDefault();
    axios()
      .put(`https://water-my-plants-tt101.herokuapp.com/users/dashboard/${id}`)
      .then(res => {
        console.log('user was updated', res.data)
        setUser(res.data)
        history.push(`/dashboard/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Edit Your User Info</h2>
          <TextField
            name="email"
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            placeholder="email"
          />
          <TextField
            name="password"
            type="password"
            id="password"
            value={user.email}
            onChange={handleChange}
            placeholder="password"
          />
          <Button color="secondary">Save Changes</Button>
      </Form>
    </div>
  )


}

export default EditUser;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #555;
    border-radius: 5px;
    max-width: 300px;
    padding: 1rem;
    gap: .25rem;
    & h2{
        text-align: center;
    }
`