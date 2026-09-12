import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BASE_URL } from "./utils/constant";
import { addConnections } from "./utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections || []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response.data.friends || []));
    } catch (error) {
      console.error("Error fetching connections:", error);
      setError("Unable to load your connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-base-200/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="
                    flex items-center justify-center
                    w-11 h-11
                    rounded-2xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20a4 4 0 0 0-8 0m10-7a3 3 0 1 0-6 0m8 7a4 4 0 0 0-3-3.87M7 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0a4 4 0 0 0-3 3.87"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    My Connections
                  </h1>

                  <p className="text-sm text-base-content/50">
                    People you're connected with
                  </p>
                </div>
              </div>
            </div>

            {/* CONNECTION COUNT */}
            {!loading && !error && (
              <div
                className="
                  self-start sm:self-auto
                  px-4 py-2
                  rounded-xl
                  bg-base-100/70
                  backdrop-blur-xl
                  border border-base-content/10
                  shadow-sm
                "
              >
                <span className="text-sm text-base-content/50">
                  Connections
                </span>

                <span className="ml-2 font-bold text-primary">
                  {connections.length}
                </span>
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-base-content/10 mt-6" />
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  h-[330px]
                  rounded-3xl
                  bg-base-100
                  border border-base-content/10
                  p-6
                  animate-pulse
                "
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-base-300" />

                  <div className="w-32 h-5 bg-base-300 rounded mt-4" />

                  <div className="w-20 h-4 bg-base-300 rounded mt-2" />

                  <div className="w-full h-16 bg-base-300 rounded-xl mt-6" />

                  <div className="w-full h-10 bg-base-300 rounded-xl mt-5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div
            className="
              max-w-md
              mx-auto
              text-center
              p-8
              rounded-3xl
              bg-base-100/80
              backdrop-blur-xl
              border border-error/20
              shadow-lg
            "
          >
            <div
              className="
                mx-auto mb-4
                w-14 h-14
                flex items-center justify-center
                rounded-2xl
                bg-error/10
                text-error
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3h.008v.008H12v-.008ZM10.29 3.86l-8.1 14a2 2 0 0 0 1.73 3h16.16a2 2 0 0 0 1.73-3l-8.1-14a2 2 0 0 0-3.46 0Z"
                />
              </svg>
            </div>

            <h2 className="text-lg font-bold mb-1">Something went wrong</h2>

            <p className="text-sm text-base-content/50 mb-5">{error}</p>

            <button
              onClick={fetchConnections}
              className="btn btn-primary rounded-xl px-6"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && !error && connections.length === 0 && (
          <div
            className="
              max-w-lg
              mx-auto
              text-center
              py-16
              px-6
              rounded-3xl

              bg-base-100/70
              backdrop-blur-xl

              border border-base-content/10
              shadow-lg
            "
          >
            <div
              className="
                mx-auto mb-5
                w-20 h-20
                flex items-center justify-center
                rounded-3xl
                bg-primary/10
                text-primary
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.742-.479M18 18.72a9.094 9.094 0 0 1-3.742-.479M18 18.72v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3a4.5 4.5 0 0 0-4.5 4.5v1.5m12 0a9.094 9.094 0 0 1-12 0m12 0a9.094 9.094 0 0 0-12 0M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold">No connections yet</h2>

            <p className="text-sm text-base-content/50 mt-2 mb-6">
              Start exploring people and build your professional network.
            </p>

            <Link
              to="/feed"
              className="
                btn
                btn-primary
                rounded-xl
                px-6
                shadow-lg
                shadow-primary/20
                hover:-translate-y-0.5
                transition-all
              "
            >
              Explore People
            </Link>
          </div>
        )}

        {/* ================= CONNECTION GRID ================= */}
        {!loading && !error && connections.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {connections.map((connection) => (
              <ConnectionCard key={connection._id} user={connection} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   CONNECTION CARD
========================================================= */

const ConnectionCard = ({ user }) => {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName || "User",
  )}&background=random`;

  return (
    <div
      className="
        group
        relative
        overflow-hidden

        rounded-3xl

        bg-base-100/75
        backdrop-blur-xl

        border border-base-content/10

        shadow-[0_8px_30px_rgba(0,0,0,0.06)]

        transition-all duration-300

        hover:-translate-y-1.5
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
        hover:border-primary/20
      "
    >
      {/* TOP GRADIENT */}
      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-24

          bg-gradient-to-br
          from-primary/20
          via-primary/5
          to-transparent
        "
      />

      {/* ================= CARD CONTENT ================= */}
      <div className="relative p-6">
        {/* PROFILE IMAGE */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="
                p-1
                rounded-full
                bg-base-100
                shadow-lg
                ring-1 ring-primary/20
              "
            >
              <img
                src={user?.profilePhoto || fallbackImage}
                alt={fullName}
                className="
                  w-24
                  h-24
                  rounded-full
                  object-cover

                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
            </div>

            {/* ONLINE DOT */}
            <span
              className="
                absolute
                bottom-1
                right-1

                w-5
                h-5

                rounded-full

                bg-success

                border-4
                border-base-100

                shadow-sm
              "
            />
          </div>
        </div>

        {/* NAME */}
        <div className="text-center mt-4">
          <h2 className="text-lg font-bold truncate">
            {fullName || "Unknown User"}
          </h2>

          {/* AGE */}
          {user?.age && (
            <p className="text-sm text-base-content/50 mt-1">
              {user.age} years old
            </p>
          )}
        </div>

        {/* BADGES */}
        <div className="flex justify-center flex-wrap gap-2 mt-4">
          {user?.gender && (
            <span
              className="
                px-3 py-1

                rounded-full

                text-xs
                font-medium

                bg-primary/10
                text-primary
              "
            >
              {user.gender}
            </span>
          )}

          {user?.profession && (
            <span
              className="
                px-3 py-1

                rounded-full

                text-xs
                font-medium

                bg-secondary/10
                text-secondary
              "
            >
              {user.profession}
            </span>
          )}
        </div>

        {/* ABOUT */}
        <div
          className="
            mt-5
            p-3.5
            rounded-2xl

            bg-base-200/60

            border border-base-content/5
          "
        >
          <p
            className="
              text-sm
              text-base-content/60
              leading-relaxed

              line-clamp-2
              min-h-[40px]
            "
          >
            {user?.about || "No information available about this user."}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-5">
          <Link
            to={`/profile/${user._id}`}
            className="
              flex-1

              btn
              btn-primary

              rounded-xl

              text-sm

              shadow-md
              shadow-primary/10

              hover:shadow-lg
              hover:shadow-primary/20

              transition-all duration-300
            "
          >
            View Profile
          </Link>

          <button
            className="
              btn
              btn-square

              rounded-xl

              bg-base-200/80

              border-0

              hover:bg-primary/10
              hover:text-primary

              transition-all duration-300
            "
            title="Message"
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
                d="M8.625 9.75h6.75m-6.75 3h4.125M21 12a8.25 8.25 0 0 1-8.25 8.25c-1.383 0-2.687-.34-3.83-.94L4.5 20.25l.94-4.42A8.25 8.25 0 1 1 21 12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connections;
