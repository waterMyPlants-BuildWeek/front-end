import { SELECTED_PLANT } from "../reducers/plantReducer"

export const selectedPlant = (data) => {
  return { type: SELECTED_PLANT, payload: data }
}