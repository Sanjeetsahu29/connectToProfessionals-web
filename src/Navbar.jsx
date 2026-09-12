import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo1 from "./assets/logo1.png";
import { removeUser } from "./utils/userSlice";
import { removeFeed } from "./utils/feedSlice";
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

      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (error) {
      console.error("Error in logging out:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-3">
      <nav
        className="
          mx-auto
          max-w-7xl
          h-16 sm:h-[70px]
          px-4 sm:px-6
          flex items-center justify-between

          rounded-2xl

          bg-base-100/75
          backdrop-blur-xl

          border border-base-content/10

          shadow-[0_8px_30px_rgba(0,0,0,0.08)]

          transition-all duration-300
        "
      >
        {/* ================= LOGO ================= */}
        <div className="flex items-center">
          <Link
            to={user ? "/" : "/login"}
            className="
              group
              flex items-center
              transition-transform duration-300
              hover:scale-[1.02]
            "
          >
            <img
              src={logo1}
              alt="Connect to Professionals"
              className="
                h-12
                sm:h-14
                w-auto
                object-contain
                transition-all duration-300
                group-hover:brightness-110
              "
            />
          </Link>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* PROFILE BUTTON */}
              <div
                tabIndex={0}
                role="button"
                className="
                  group
                  flex items-center
                  gap-2 sm:gap-3
                  px-2 sm:px-3
                  py-1.5

                  rounded-xl

                  hover:bg-base-content/5

                  transition-all duration-300
                "
              >
                {/* USER INFORMATION */}
                <div className="hidden sm:flex flex-col items-end leading-tight">
                  <span className="text-[11px] text-base-content/50 font-medium">
                    Welcome back
                  </span>

                  <span className="text-sm font-semibold">
                    {user.firstName}
                  </span>
                </div>

                {/* AVATAR */}
                <div className="relative">
                  <div
                    className="
                      avatar
                      rounded-full
                      ring-2
                      ring-primary/20
                      group-hover:ring-primary/50
                      transition-all duration-300
                    "
                  >
                    <div className="w-10 sm:w-11 rounded-full">
                      <img
                        src={
                          user?.profilePhoto ||
                          "https://ui-avatars.com/api/?name=" +
                            user?.firstName +
                            "&background=random"
                        }
                        alt="User profile"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* ONLINE INDICATOR */}
                  <span
                    className="
                      absolute
                      bottom-0
                      right-0

                      w-3
                      h-3

                      rounded-full

                      bg-success

                      border-2
                      border-base-100
                    "
                  />
                </div>

                {/* DROPDOWN ICON */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    hidden sm:block
                    w-4 h-4
                    text-base-content/50
                    transition-transform duration-300
                    group-focus:rotate-180
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </div>

              {/* ================= DROPDOWN ================= */}
              <ul
                tabIndex={-1}
                className="
                  menu
                  menu-sm

                  dropdown-content

                  mt-3
                  w-64
                  p-2

                  rounded-2xl

                  bg-base-100/95
                  backdrop-blur-xl

                  border
                  border-base-content/10

                  shadow-[0_15px_50px_rgba(0,0,0,0.15)]

                  animate-[fadeIn_0.2s_ease-out]
                "
              >
                {/* PROFILE HEADER */}
                <li className="mb-1">
                  <div
                    className="
                      flex items-center
                      gap-3
                      p-3
                      rounded-xl
                      bg-base-content/5
                      pointer-events-none
                    "
                  >
                    <div className="avatar">
                      <div className="w-11 rounded-full">
                        <img
                          src={
                            user?.profilePhoto ||
                            "https://ui-avatars.com/api/?name=" +
                              user?.firstName
                          }
                          alt="Profile"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold truncate">
                        {user.firstName} {user.lastName}
                      </p>

                      <p className="text-xs text-base-content/50 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>

                <div className="divider my-1 opacity-50" />

                {/* PROFILE */}
                <li>
                  <Link
                    to="/profile"
                    className="
                      rounded-xl
                      py-3
                      transition-all duration-200
                      hover:bg-primary/10
                      hover:text-primary
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                      />
                    </svg>

                    <span>My Profile</span>
                  </Link>
                </li>

                {/* CONNECTIONS */}
                <li>
                  <Link
                    to="/connections"
                    className="
      rounded-xl
      py-3
      transition-all duration-200
      hover:bg-primary/10
      hover:text-primary
    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2
           M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8
           M22 21v-2a4 4 0 0 0-3-3.87
           M16 3.13a4 4 0 0 1 0 7.75"
                      />
                    </svg>

                    <span>Connections</span>
                  </Link>
                </li>

                {/* CONNECTION REQUESTS */}
                <li>
                  <Link
                    to="/requests"
                    className="
      rounded-xl
      py-3
      transition-all duration-200
      hover:bg-primary/10
      hover:text-primary
    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19a6 6 0 0 0-12 0
           M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8
           M19 8v6
           M22 11h-6"
                      />
                    </svg>

                    <span>View Requests</span>
                  </Link>
                </li>

                <div className="divider my-1 opacity-50" />

                {/* LOGOUT */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="
                      rounded-xl
                      py-3

                      text-error

                      hover:bg-error/10
                      hover:text-error

                      transition-all duration-200
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 15l3-3m0 0-3-3m3 3H3"
                      />
                    </svg>

                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* ================= AUTH BUTTONS ================= */
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="
                  btn
                  btn-ghost
                  btn-sm sm:btn-md

                  rounded-xl

                  font-semibold

                  hover:bg-base-content/10

                  transition-all duration-300
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  btn
                  btn-primary
                  btn-sm sm:btn-md

                  rounded-xl

                  px-4 sm:px-5

                  font-semibold

                  shadow-lg
                  shadow-primary/20

                  hover:shadow-xl
                  hover:shadow-primary/30

                  hover:-translate-y-0.5

                  transition-all duration-300
                "
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
