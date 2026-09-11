import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "./utils/constant";
import { addUser } from "./utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchLoggedInUser();
    }
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-16 pb-14">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
