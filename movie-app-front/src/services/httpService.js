import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.post,
  delete: axios.delete,
  setCommonHeader,
};

export default httpService;
