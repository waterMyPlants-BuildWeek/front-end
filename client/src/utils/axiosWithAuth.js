import axios from 'axios'

export const axiosWithAuth = () => {
    const userToken = localStorage.getItem("userToken")

    return axios.create({
        headers: { token: userToken }
    })
}
