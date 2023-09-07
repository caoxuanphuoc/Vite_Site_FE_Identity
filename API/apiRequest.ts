import axiosClient from "./axios.config";
type info = {
    username?: string;
    password?: string;
  };
const getProduct = async(input : info) : object => {
    const res = await axiosClient.post("/login", input)
    return res.data;
}