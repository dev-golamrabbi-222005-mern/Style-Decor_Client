import axios from "axios";

const axiosPublic = axios.create({
  // This logic automatically switches between local and live servers
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://style-decor-server-six-amber.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
