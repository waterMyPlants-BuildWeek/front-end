import axios from 'axios'

export const axiosWithAuth = () => {
    const userToken = localStorage.getItem("token")

    return axios.create({
        headers: { token: userToken }
    })
}
