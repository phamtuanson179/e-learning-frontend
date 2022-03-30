import axios from "axios";
import axiosInstance from "axios";
import ENDPOINT from "./loginAPI";
import queryString from "query-string";
import { header } from "express-validator";

const apiCallStack = [];
// const URL

const axiosClient = axiosInstance.create({
  baseURL: process.env.REACT_APP_API_URL_LOCALHOST,
  // headers: {
  //     'content-type': 'application/json',
  //     'accept': 'application/json',
  //     timeout: 30000,
  // },
  // paramsSerializer: params => queryString.stringifyUrl(params),
});

axiosClient.interceptors.request.use(
  function (config) {
    //add handle token
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    if (localStorage.getItem("accessToken")) {
      headers = {
        ...headers,
        token: localStorage.getItem("accessToken"),
      };
    }

    config.headers = headers;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    // if (response && response.data) {
    //     return response.data;
    // }
    // const apiCallIndex = apiCallStack.indexOf(response.config?.url);
    // if (apiCallIndex !== -1) {
    //   // showLoading(false)
    //   apiCallStack.splice(apiCallIndex, 1);
    // }

    return response;
  },
  function (err) {
    // const apiCallIndex = apiCallStack.indexOf(error.config?.url);
    // if (apiCallIndex !== -1) {
    //   //showLoading(false)
    //   apiCallStack.splice(apiCallIndex, 1);
    // }
    // return Promise.reject(error);
  }
);

export default axiosClient;
