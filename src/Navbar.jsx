import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo1 from "./assets/logo1.png";
import { removeUser } from "./utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50 h-16 px-4 sm:px-6">
      {/* Logo */}
      <div className="flex-1">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <img
            src={logo1}
            alt="Connect to Professionals"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center">
        {user ? (
          /* ================= LOGGED IN ================= */
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2 sm:gap-3"
            >
              {/* Welcome text - hidden on very small screens */}
              <span className="hidden sm:block text-sm font-medium">
                Welcome, {user.firstName}
              </span>

              {/* Profile image */}
              <div className="avatar">
                <div className="w-9 sm:w-10 rounded-full">
                  <img alt="User profile" src={user?.profilePhoto} />
                </div>
              </div>
            </div>

            {/* Logged-in dropdown */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
            >
              {/* User information */}
              <li className="menu-title">
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </li>

              <li>
                <button onClick={() => navigate("/profile")}>Profile</button>
              </li>

              <li>
                <button onClick={() => navigate("/settings")}>Settings</button>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          /* ================= LOGGED OUT ================= */
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-ghost btn-sm sm:btn-md"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="btn btn-primary btn-sm sm:btn-md"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
