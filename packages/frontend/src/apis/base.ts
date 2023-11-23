import axios from "axios";

const apiVersion = "/api/v1";
const baseURL = `${process.env.NEXT_PUBLIC_API_HOST}${apiVersion}`;

const instance = axios.create({
  baseURL,
});

export { baseURL, instance };
