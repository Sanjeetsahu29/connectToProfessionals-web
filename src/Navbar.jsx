import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo1 from "./assets/logo1.png";
import { removeUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constant";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      navigate("/login");
      dispatch(removeUser());
    } catch (error) {
      console.error("Error in logging out:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50 h-16 px-4 sm:px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="cursor-pointer">
          <img
            src={logo1}
            alt="Connect to Professionals"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2 sm:gap-3"
            >
              <span className="hidden sm:block text-sm font-medium">
                Welcome, {user.firstName}
              </span>

              <div className="avatar">
                <div className="w-9 sm:w-10 rounded-full">
                  <img alt="User profile" src={user?.profilePhoto} />
                </div>
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
            >
              <li className="menu-title">
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/settings">Settings</Link>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm sm:btn-md">
              Login
            </Link>

            <Link to="/signup" className="btn btn-primary btn-sm sm:btn-md">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
