import {axiosWithAuth} from '../utils/axiosWithAuth'

export const getUserPlants = async (id) => {
    return axiosWithAuth().get(`https://water-my-plants-tt101.herokuapp.com/plants/user/${id}`)
        .then((res) => {
            return res.data
        })
}