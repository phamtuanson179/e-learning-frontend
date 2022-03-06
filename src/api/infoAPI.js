import axiosClient from "./baseAPI"


const infoAPI = {

    getInfo: () => {
        const url = '/get_user'
        const headers = {
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NjU2NjAxMH0.sQRn5FDZPUrvAe7RmjHKv95fj33iW8HrggNc5eTOqZ8'
        }
        const params = {
            email: 'truong.phong@techpro.com.vn'
        }
        return axiosClient.get(url, { headers, params })
    },
    putUpdateUser: (data) => {
        const url = '/update_user'
        const headers = {
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NjU2NjAxMH0.sQRn5FDZPUrvAe7RmjHKv95fj33iW8HrggNc5eTOqZ8',
            'Content-Type': 'application/json'
        }
        return axiosClient.put(url, data, { headers })
    }
}

export default infoAPI