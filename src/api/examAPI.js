import axiosClient from "./baseAPI";

const examAPI = {
  getExam: (params) => {
    const url = "/get_exam";
    const headers = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRydW9uZy5waG9uZ0B0ZWNocHJvLmNvbS52biIsImV4cCI6MTY0NjU2NjAxMH0.sQRn5FDZPUrvAe7RmjHKv95fj33iW8HrggNc5eTOqZ8",
    };
    return axiosClient.get(url, { headers, params });
  },
};

export default examAPI;
