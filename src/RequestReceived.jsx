import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constant";

const RequestReceived = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH RECEIVED CONNECTION REQUESTS
  // ==========================================

  const fetchReceivedRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BASE_URL}/user/connections/received/interested`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data.recievedConnectionRequests);
      setRequests(response.data.recievedConnectionRequests || []);
    } catch (error) {
      console.error("Error fetching connection requests:", error);

      setError(
        error.response?.data?.message || "Unable to load connection requests.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ACCEPT / REJECT CONNECTION REQUEST
  // ==========================================

  const handleRequestReview = async (requestId, status) => {
    try {
      setActionLoading(requestId);
      setError("");

      const response = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );

      console.log("Request updated:", response.data);

      // Remove the request from UI
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId),
      );
    } catch (error) {
      console.error("Error reviewing connection request:", error);

      setError(
        error.response?.data?.message ||
          "Unable to process the connection request.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // FETCH REQUESTS ON COMPONENT LOAD
  // ==========================================

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="text-sm text-base-content/50">
            Loading connection requests...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
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
                  d="M18 8a6 6 0 11-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.73 21a2 2 0 01-3.46 0"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                Connection Requests
              </h1>

              <p className="text-sm md:text-base text-base-content/50 mt-1">
                People who want to connect with you
              </p>
            </div>
          </div>

          {/* Request Count */}

          {requests.length > 0 && (
            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-primary/10
                text-primary
                font-semibold
                text-sm
              "
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {requests.length}{" "}
              {requests.length === 1 ? "new request" : "new requests"}
            </div>
          )}
        </div>

        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (
          <div className="alert alert-error rounded-2xl mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* ==========================================
            EMPTY STATE
        ========================================== */}

        {requests.length === 0 && !error && (
          <div
            className="
              bg-base-100
              rounded-3xl
              border
              border-base-300/60
              shadow-sm
              p-10
              md:p-16
              text-center
            "
          >
            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-3xl
                bg-primary/10
                flex
                items-center
                justify-center
                mb-6
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                />

                <circle cx="9" cy="7" r="4" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 8v6m3-3h-6"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold">No connection requests</h2>

            <p className="text-base-content/50 max-w-md mx-auto mt-2">
              You're all caught up. New connection requests will appear here.
            </p>
          </div>
        )}

        {/* ==========================================
            REQUEST LIST
        ========================================== */}

        <div className="space-y-4">
          {requests.map((request) => {
            const user = request.fromUserId;

            const isProcessing = actionLoading === request._id;

            return (
              <div
                key={request._id}
                className="
                  group
                  bg-base-100
                  rounded-3xl
                  border
                  border-base-300/60
                  shadow-sm
                  hover:shadow-xl
                  hover:border-primary/20
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* ==========================================
                        PROFILE
                    ========================================== */}

                    <div className="flex items-start gap-4 flex-1">
                      {/* Profile Image */}

                      <div className="relative shrink-0">
                        <div
                          className="
                            w-20
                            h-20
                            md:w-24
                            md:h-24
                            rounded-2xl
                            overflow-hidden
                            ring-2
                            ring-base-200
                            group-hover:ring-primary/20
                            transition
                          "
                        >
                          <img
                            src={user.profilePhoto}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-105
                              transition-transform
                              duration-300
                            "
                          />
                        </div>

                        {/* New Request Indicator */}

                        <span
                          className="
                            absolute
                            -right-1
                            -bottom-1
                            w-6
                            h-6
                            rounded-full
                            bg-primary
                            border-4
                            border-base-100
                          "
                        />
                      </div>

                      {/* User Details */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg md:text-xl font-bold">
                            {user.firstName} {user.lastName}
                          </h2>

                          <span
                            className="
                              px-2.5
                              py-1
                              rounded-full
                              bg-primary/10
                              text-primary
                              text-xs
                              font-semibold
                            "
                          >
                            Interested
                          </span>
                        </div>

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-x-3
                            gap-y-1
                            mt-2
                            text-sm
                            text-base-content/55
                          "
                        >
                          <span>{user.age} years</span>

                          <span>•</span>

                          <span className="capitalize">{user.gender}</span>
                        </div>

                        {user.about && (
                          <p
                            className="
                              mt-3
                              text-sm
                              text-base-content/60
                              line-clamp-2
                              leading-6
                            "
                          >
                            {user.about}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ==========================================
                        ACTION BUTTONS
                    ========================================== */}

                    <div
                      className="
                        flex
                        md:flex-col
                        lg:flex-row
                        gap-2
                        md:justify-center
                      "
                    >
                      {/* ACCEPT BUTTON */}

                      <button
                        disabled={isProcessing}
                        onClick={() =>
                          handleRequestReview(request._id, "accepted")
                        }
                        className="
                          btn
                          btn-primary
                          rounded-xl
                          flex-1
                          md:flex-none
                          md:min-w-32
                          shadow-md
                          shadow-primary/20
                        "
                      >
                        {isProcessing ? (
                          <span className="loading loading-spinner loading-sm" />
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Accept
                          </>
                        )}
                      </button>

                      {/* IGNORE BUTTON */}

                      <button
                        disabled={isProcessing}
                        onClick={() =>
                          handleRequestReview(request._id, "rejected")
                        }
                        className="
                          btn
                          btn-outline
                          rounded-xl
                          flex-1
                          md:flex-none
                          md:min-w-32
                        "
                      >
                        {isProcessing ? (
                          <span className="loading loading-spinner loading-sm" />
                        ) : (
                          <>
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Ignore
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Accent */}

                <div
                  className="
                    h-1
                    w-full
                    bg-gradient-to-r
                    from-primary
                    via-secondary
                    to-accent
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RequestReceived;
