import axiosClient from "./baseAPI";

const examAPI = {
  getExam: (params) => {
    const url = "/get_exam";
    return axiosClient.get(url, { params });
  },

  getListExamByRoom: (params) => {
    const url = "/get_exams_for_room";
    return axiosClient.get(url, { params });
  },
};

export default examAPI;
