import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BASE_URL } from "./utils/constant";
import { addConnections } from "./utils/connectionSlice";

const EMPTY_CONNECTIONS = [];

const Connections = () => {
  const dispatch = useDispatch();

  // Stable selector fallback
  const connectionData = useSelector((store) => store.connections);

  const connections = connectionData ?? EMPTY_CONNECTIONS;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH CONNECTIONS
  ========================================================= */

  useEffect(() => {
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

    fetchConnections();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-base-200/40 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary mb-1">NETWORK</p>

              <h1 className="text-3xl sm:text-4xl font-bold">
                Your Connections
              </h1>

              <p className="text-sm text-base-content/50 mt-2">
                Stay connected with people in your professional network.
              </p>
            </div>

            {!loading && !error && (
              <div
                className="
                  hidden sm:flex
                  items-center gap-2
                  px-4 py-2
                  rounded-full
                  bg-base-100
                  border border-base-content/10
                  shadow-sm
                "
              >
                <span
                  className="
                    w-2.5 h-2.5
                    rounded-full
                    bg-primary
                  "
                />

                <span className="font-semibold">{connections.length}</span>

                <span className="text-sm text-base-content/50">
                  connections
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 h-px bg-base-content/10" />
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  bg-base-100
                  border border-base-content/10
                  rounded-2xl
                  p-5
                  animate-pulse
                "
              >
                <div className="flex gap-5">
                  <div
                    className="
                      w-20 h-20
                      sm:w-24 sm:h-24
                      rounded-2xl
                      bg-base-300
                      shrink-0
                    "
                  />

                  <div className="flex-1">
                    <div className="w-40 h-5 rounded bg-base-300" />

                    <div className="w-28 h-4 rounded bg-base-300 mt-3" />

                    <div className="w-full max-w-md h-12 rounded bg-base-300 mt-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div
            className="
              max-w-md
              mx-auto
              text-center
              bg-base-100
              border border-error/20
              rounded-2xl
              p-8
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                w-14 h-14
                rounded-full
                bg-error/10
                text-error
                flex items-center justify-center
                mb-4
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
                  d="M12 9v3m0 3h.01M10.29 3.86l-8.1 14a2 2 0 0 0 1.73 3h16.16a2 2 0 0 0 1.73-3l-8.1-14a2 2 0 0 0-3.46 0Z"
                />
              </svg>
            </div>

            <h2 className="text-lg font-bold">Unable to load connections</h2>

            <p className="text-sm text-base-content/50 mt-2">
              Something went wrong while fetching your connections.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                btn
                btn-primary
                rounded-xl
                mt-5
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading && !error && connections.length === 0 && (
          <div
            className="
                max-w-lg
                mx-auto
                text-center
                py-16
                px-6
                bg-base-100
                border border-base-content/10
                rounded-3xl
                shadow-sm
              "
          >
            <div
              className="
                  mx-auto
                  w-20 h-20
                  rounded-3xl
                  bg-primary/10
                  text-primary
                  flex items-center justify-center
                  mb-6
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
                  d="M15 19.128a9.094 9.094 0 0 0 3.75.872A9.094 9.094 0 0 0 22.5 19.128M15 19.128v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3a4.5 4.5 0 0 0-4.5 4.5v1.5m12 0a9.094 9.094 0 0 1-12 0M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 2.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM3 9a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold">No connections yet</h2>

            <p className="text-base-content/50 mt-2">
              Discover professionals and start building your network.
            </p>

            <Link
              to="/feed"
              className="
                  btn
                  btn-primary
                  rounded-xl
                  mt-6
                  px-6
                "
            >
              Discover People
            </Link>
          </div>
        )}

        {/* =================================================
            CONNECTION LIST
        ================================================= */}

        {!loading && !error && connections.length > 0 && (
          <div className="space-y-4">
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
  )}&background=random&color=fff`;

  return (
    <div
      className="
        group

        bg-base-100

        border border-base-content/10

        rounded-2xl

        p-4 sm:p-5

        transition-all duration-300

        hover:border-primary/30
        hover:shadow-lg
        hover:-translate-y-0.5
      "
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* =================================================
            PROFILE IMAGE
        ================================================= */}

        <div className="relative shrink-0">
          <img
            src={user?.profilePhoto || fallbackImage}
            alt={fullName || "User"}
            className="
              w-20
              h-20

              sm:w-24
              sm:h-24

              rounded-2xl

              object-cover

              ring-1
              ring-base-content/10

              transition-transform
              duration-300

              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* =================================================
            USER INFORMATION
        ================================================= */}

        <div className="flex-1 min-w-0">
          {/* NAME + BUTTON */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-start
              sm:justify-between
              gap-3
            "
          >
            <div className="min-w-0">
              <h2
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  truncate
                "
              >
                {fullName || "Unknown User"}
              </h2>

              <div className="flex items-center flex-wrap gap-2 mt-1">
                {user?.age && (
                  <span className="text-sm text-base-content/50">
                    {user.age} years
                  </span>
                )}

                {user?.gender && (
                  <>
                    <span className="text-base-content/20">•</span>

                    <span
                      className="
                        text-sm
                        text-base-content/50
                        capitalize
                      "
                    >
                      {user.gender}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* DESKTOP VIEW PROFILE */}

            <Link
              to={`/profile/${user._id}`}
              className="
                hidden
                sm:flex
                items-center
                gap-2

                px-4
                py-2

                rounded-xl

                border
                border-base-content/10

                text-sm
                font-semibold

                hover:bg-primary
                hover:text-primary-content
                hover:border-primary

                transition-all
              "
            >
              View Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          {/* =================================================
              PROFESSION
          ================================================= */}

          {user?.profession && (
            <div className="mt-3">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2

                  px-3
                  py-1.5

                  rounded-lg

                  bg-primary/10
                  text-primary

                  text-xs
                  font-semibold
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.098a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V14.15m16.5 0v-1.2a2.25 2.25 0 0 0-2.25-2.25h-3.75v-1.5a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v1.5H6a2.25 2.25 0 0 0-2.25 2.25v1.2m16.5 0a8.25 8.25 0 0 1-16.5 0"
                  />
                </svg>

                {user.profession}
              </span>
            </div>
          )}

          {/* =================================================
              ABOUT
          ================================================= */}

          <p
            className="
              text-sm
              text-base-content/60
              leading-relaxed
              mt-4

              line-clamp-2

              max-w-2xl
            "
          >
            {user?.about || "This user hasn't added an introduction yet."}
          </p>

          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <Link
            to={`/profile/${user._id}`}
            className="
              sm:hidden

              flex
              items-center
              justify-center
              gap-2

              w-full

              mt-4
              py-2.5

              rounded-xl

              bg-primary
              text-primary-content

              text-sm
              font-semibold

              transition-all

              hover:opacity-90
            "
          >
            View Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connections;
