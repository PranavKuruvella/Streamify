import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", //prefix edhi /users ki rasthe baseUrl+/users ki call avthundhi
  withCredentials: true //send cookies with the req....aka cookies kuda pampi ani ardham
})