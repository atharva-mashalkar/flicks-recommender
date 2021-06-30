import axios from "axios";

export const baseURL = "https://recommend-py.herokuapp.com/";

function getpyaxiosInstance() {
  const axiosInstance = axios.create({
    baseURL:"https://recommend-py.herokuapp.com"
  });
  return axiosInstance;
}

function getnodeaxiosInstance() {
  const axiosInstance = axios.create({
    baseURL:"https://recommend-py.herokuapp.com"
  });
  return axiosInstance;
}

function getomdbaxiosInstance(){
  const axiosInstance = axios.create({
    baseURL:"http://www.omdbapi.com/?apikey=867e4d01&"
  })
}

export const omdbRequest = {
  get(url, successAction, failureAction) {
    getomdbaxiosInstance()
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
  }
}

export const nodeRequest = {
  get(url, successAction, failureAction) {
    getnodeaxiosInstance()
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
    getnodeaxiosInstance()
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

export const pyRequest = {
  get(url, successAction, failureAction) {
    getpyaxiosInstance()
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
    getpyaxiosInstance()
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
