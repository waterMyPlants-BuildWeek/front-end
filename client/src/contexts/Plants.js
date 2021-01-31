import React, { createContext, useReducer} from 'react'
import {plantReducer, initialState} from '../reducers/plantReducer'

export const PlantContext = createContext()

export const PlantsProvider = ({children}) => {

    const [plants, dispatch] = useReducer(plantReducer, initialState)

    return(
        <PlantContext.Provider
            value={{
                plants,
                dispatch
            }}
        >
            {children}
        </PlantContext.Provider>
    )
}


