import React, { createContext, useReducer} from 'react'
import {plantReducer, initialState} from '../reducers/plantReducer'

export const PlantContext = createContext()

export const PlantsProvider = ({children}) => {

    const [plants, plantDispatch] = useReducer(plantReducer, initialState)

    return(
        <PlantContext.Provider
            value={{
                plants,
                plantDispatch
            }}
        >
            {children}
        </PlantContext.Provider>
    )
}


