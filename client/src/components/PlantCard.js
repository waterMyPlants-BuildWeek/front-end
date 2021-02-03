import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { selectedPlant } from '../actions/selectedPlant'
import { PlantContext } from '../contexts/Plants'
import { formatDate } from '../utils/formatDate'
import { dateDiff } from '../utils/dateDiff'
import { decodeFrequency } from '../utils/decodeFrequency';

const PlantCard = (props) => {

    const { plants, plantDispatch } = useContext(PlantContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        if (!plants.editing){
             handleClose()
        }   
    }, [plants.editing])

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

    const justWatered = () => {
        const newPlant = ({...props, last_watered: formatDate(new Date())})

        axiosWithAuth()
            .put(`https://water-my-plants-tt101.herokuapp.com/plants/${props.id}`, newPlant)
            .then(res => getPlants())
            .catch(err => console.log(err))
    }

    const checkNeedsWatering = () => {
        if(dateDiff(last_watered) > decodeFrequency(h2oFrequency)){
            return 'water'
        } else {
            return ''
        }
    }

    return (
        <Card className={checkNeedsWatering()}>
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
                    <MenuItem onClick={() => plantDispatch(selectedPlant(props))}>Edit Plant</MenuItem>
                    <MenuItem onClick={() => deleteItem(id)}>Delete Plant</MenuItem>
                </Menu>
            </Header>
            <img src={image} alt='{species}'/>
            <Content>
                <p><strong>Water Plant:</strong> {h2oFrequency}</p>
                <p><strong>Last Watered:</strong> {last_watered}</p>
                <p>{details}</p>
            </Content>
            <ButtonGroup>
                <MyButton 
                    color='primary' 
                    variant='contained'
                    onClick={justWatered}
                >
                        Just Watered
                </MyButton>
            </ButtonGroup>
        </Card>
    )
}

export default PlantCard

const Card = styled.div`
    display: grid;
    grid-template-columns: 1fr;
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
    &.water{
        background-color: #ffcdd2;
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