import axios from "axios";

const apiVersion = "/api/v1";

const instance = axios.create({
  baseURL: apiVersion,
});

export { instance };
