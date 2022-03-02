import axiosClient from './baseAPI'

const examAPI = {
    getExam: (params) => {
        const url = '/get_exam'
        const headers = {
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NjIzMjkzN30.58_J4UrW5eqPTVqlBsxhSYQ_Qg9vDryZ7zFVkKEeR6Q'
        }
        return axiosClient.get(url, { headers, params })
    }
}

export default examAPI;