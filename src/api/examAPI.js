import axiosClient from "./baseAPI";

const examAPI = {
  getExam: (params) => {
    const url = "/get_exam";
    const headers = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NjMyNTUyN30.caQE4WqpNaAC6ojU7YtAnbILcYssn85n9pbvB8pOvCw",
    };
    return axiosClient.get(url, { headers, params });
  },
};

export default examAPI;
