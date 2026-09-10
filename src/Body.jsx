import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
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
