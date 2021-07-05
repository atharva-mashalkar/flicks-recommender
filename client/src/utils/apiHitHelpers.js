import axios from "axios";

export const baseURL = "https://flicks-recommender.herokuapp.com";

function getaxiosInstance() {
  const token = localStorage.getItem('JWT-Token')
  let headers = {};
  if (token && token !== undefined) {
    headers['Authorization'] = 'Bearer ' + token
  }
  const axiosInstance = axios.create({
    baseURL:"https://flicks-recommender.herokuapp.com",
    headers
  });
  return axiosInstance;
}

export const Recommender = {
  get(url, successAction, failureAction) {
    getaxiosInstance()
      .get(url)
      .then((succResp) => {
        if (successAction) {
          successAction(succResp);
        }
      })
      .catch((err) => {
        if (failureAction) {
          failureAction(err);
        }
      });
  },

  post(url, data, successAction, failureAction) {
    getaxiosInstance()
      .post(url, data)
      .then((succResp) => {
        if (successAction) {
          successAction(succResp);
        } 
      })
      .catch((err) => {
        console.log(err);
        if (failureAction) {
          failureAction(err);
        }
      });
  },
};
