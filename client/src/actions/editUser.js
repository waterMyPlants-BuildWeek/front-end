import { SET_USER } from "../reducers/userReducer";

export const editUser = user => {
  return { type: SET_USER, payload: user}
}