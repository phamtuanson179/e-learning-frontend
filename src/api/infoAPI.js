import axiosClient from "./baseAPI"


const baseUrl = '/'
const infoAPI = {

    getInfo: () => {
        const url = baseUrl + 'get-user'
        const headers = {
            'content-type': 'application/json',
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NTk5MDA3OH0.fGIVbIIYTCnXjXLcwjlBrPbrLhoQcYr31FbNNhEYvCA'
        }
        const params = {
            email: 'truong.phong@techpro.com.vn'
        }
        return axiosClient.get(url, headers, { params })
    },
    putUpdateUser: (body) => {
        const url = baseUrl + 'update-user'
        return axiosClient.post(url, data)
    }
}

export default infoAPI