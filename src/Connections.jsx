import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useEffect } from "react";

const Connections = () => {
  const fetchConnection = async (req, res) => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.friends);
    } catch (error) {}
  };
  useEffect(() => {
    fetchConnection();
  }, []);
  return <div>Connections</div>;
};

export default Connections;
