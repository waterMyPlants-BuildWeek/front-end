import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, {useState} from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { axiosWithAuth } from '../utils/axiosWithAuth'

const PlantCard = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const { 
        nickname,
        h2oFrequency,
        id,
        image,
        species,
        last_watered,
        details,
        getPlants
     } = props

    const deleteItem = (selected) => {
        axiosWithAuth().delete(`https://water-my-plants-tt101.herokuapp.com/plants/${selected}`)
        .then(res => {
            getPlants()
        })
    }
    
    return (
        <Card>
            <Header>
                <div>
                <h2>{nickname}</h2>
                <p>Species: {species}</p>
                </div>
                <IconButton
                    aria-label="more"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MyMoreVertIcon />
                </IconButton>
                <Menu
                id='menu'
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                >
                    <MenuItem>Edit Plant</MenuItem>
                    <MenuItem onClick={() => deleteItem(id)}>Delete Plant</MenuItem>
                </Menu>
            </Header>
            <img src={image} alt='{species}'/>
            <Content>
                <p><strong>Water Plant:</strong> {h2oFrequency}</p>
                <p><strong>Last Watered:</strong> {last_watered}</p>
            </Content>
            <ButtonGroup>
                <MyButton color='primary' variant='contained'>Just Watered</MyButton>
            </ButtonGroup>
        </Card>
    )
}

export default PlantCard

const Card = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 0 3px rgba(0,0,0,.35);
    background-color: #fff;
    & img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
    }
    & * {
        margin: 0;
    }
`

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    text-transform: capitalize;
    align-items: start;
    padding: 1rem;
    & h2 {
        font-size: 1.25rem;
    }
    & p{
        font-size: .75rem;
        color: rgba(0, 0, 0, 0.54);
    }
`

const Content = styled.div`
    padding: 1rem;
    color: rgba(0, 0, 0, 0.54);
    font-size: .875rem;
`

const ButtonGroup = styled.div`
    padding: 0 1rem 1rem;
`


const MyButton = styled(Button)`
    width: 100%;
`

const MyMoreVertIcon = styled(MoreVertIcon)`
    justify-self: end;
`