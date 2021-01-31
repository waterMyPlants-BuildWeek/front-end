import { UPDATE_USER } from '../reducers/userReducer'

export const updateUser = (data) => {
    return { type: UPDATE_USER, payload: data}
}