import React, { useState, useEffect} from 'react'
import { db } from '../firebase'
import PlantCard from './PlantCard'

const MyPlants = ({uid}) => {

    const [plants, setPlants] = useState([])


    // useEffect(() => {
    //     db.collection('plants').where("user", "==", uid).onSnapshot(snapshot => 
    //     {
    //         let data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    //         setPlants(data)
    //     })
    // },[])

    useEffect(() => {
        db.collection('plants').where("user", "==", uid).onSnapshot(snapshot => 
            {
                let data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
                setPlants(data)
            })
    },[])

    useEffect(() => {
        console.log(plants)
    }, [plants])

    return (
        <div>
            {plants.map(plant => 
                <PlantCard
                    {...plant}
                />
            )}
        </div>
    )
}

export default MyPlants
