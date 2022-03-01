import axiosClient from "./baseAPI"


const baseUrl = '/'
const infoAPI = {

    getInfo: () => {
        const url = baseUrl + 'get_user'
        const headers = {
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NjA5ODc0MH0.yUN2S476pGc4anka5mHQ0qcsPzFUldK5D9Hd395LsjE'
        }
        const params = {
            email: 'truong.phong@techpro.com.vn'
        }
        return axiosClient.get(url, { headers, params })
    },
    putUpdateUser: (body) => {
        const url = baseUrl + 'update-user'
        return axiosClient.post(url, data)
    }
}

export default infoAPI