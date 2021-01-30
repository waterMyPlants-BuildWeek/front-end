import { GET_PLANTS } from '../reducers/plantReducer'

export const getPlantsAction = (data) => {
    return {type: GET_PLANTS, payload: data}
}