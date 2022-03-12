import axiosClient from "./baseAPI";

const examAPI = {
  getExam: (params) => {
    const url = "/get_exam";
    return axiosClient.get(url, { params });
  },

  getListExamForRoom: (params) => {
    const url = "/get_exams_for_room";
    return axiosClient.get(url, { params });
  },

  addExamByAdmin: (data) => {
    const url = '/admin/add_exam';
    return axiosClient.post(url, data)
  },

  deleteExamById: (params) => {
    const url = '/admin/delete_exam';
    return axiosClient.delete(url, { params })
  }
};

export default examAPI;
