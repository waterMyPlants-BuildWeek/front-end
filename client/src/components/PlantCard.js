import React from 'react'
import styled from 'styled-components'
import { db } from '../firebase'

const PlantCard = (props) => {

    const { 
        nickname,
        h2oFrequency,
        id,
        image,
        species,
        user
     } = props

    //  const deleteItem = (collection, item) => {
    //     db.collection(collection).doc(item.id).delete()
    //   }

    const deleteItem = (e) => {
        db.collection('plants').doc(e.target.value).delete()
    }

    return (
        <Card>
            <img src={image}/>
            <div>
                <h2>{nickname}</h2>
                <p>Species: {species}</p>
                <p>h2oFrequency: {h2oFrequency}</p>
                <button>Just Watered</button>
                <button value={id} onClick={deleteItem}>Delete Plant</button>
            </div>
        </Card>
    )
}

export default PlantCard

const Card = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: .6rem;
    box-shadow: 0 0 8px rgba(0,0,0,.35);
    & div {
        padding: 1rem;
    }
    & img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
        border-radius: .6rem .6rem 0 0;
    }
    & * {
        margin: 0;
    }
    margin: 3rem;
`