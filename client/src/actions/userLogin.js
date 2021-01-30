import { LOGIN } from '../reducers/userReducer'

export const userLogin = (data) => {
    return { type: LOGIN, payload: data}
}