import axiosClient from "./baseAPI";

const examAPI = {
  getExam: (params) => {
    const url = "/get_exam";
    return axiosClient.get(url, { params });
  },
};

export default examAPI;
