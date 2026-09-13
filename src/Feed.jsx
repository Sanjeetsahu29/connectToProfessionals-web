import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "./utils/constant";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Current page fetched from backend
  const [page, setPage] = useState(1);

  // Initial loading
  const [loading, setLoading] = useState(true);

  // Loading next 10 users
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  // Loading Interest / Ignore
  const [actionLoading, setActionLoading] = useState(false);

  // Whether more users may exist
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  // =====================================================
  // FETCH FEED
  // =====================================================

  const getFeed = useCallback(
    async (pageNumber, append = false) => {
      try {
        if (pageNumber === 1 && !append) {
          setLoading(true);
        } else {
          setLoadingNextPage(true);
        }

        const res = await axios.get(`${BASE_URL}/user/feed`, {
          params: {
            page: pageNumber,
            limit: LIMIT,
          },
          withCredentials: true,
        });

        const newUsers = res.data.feedUsers || [];

        console.log(`Fetched page ${pageNumber}:`, newUsers);

        // =================================================
        // FIRST PAGE
        // =================================================

        if (pageNumber === 1 && !append) {
          dispatch(addFeed(newUsers));

          setPage(1);

          setHasMore(newUsers.length === LIMIT);

          return newUsers;
        }

        // =================================================
        // NEXT PAGE
        // =================================================

        if (newUsers.length > 0) {
          /*
            Append new users to the existing feed.

            Example:

            Existing:
            [1,2,3,4,5,6,7,8,9,10]

            New:
            [11,12,13,14,15,16,17,18,19,20]

            Result:
            [1,2,...10,11,12,...20]
          */

          dispatch(addFeed([...(feed || []), ...newUsers]));

          setPage(pageNumber);

          setHasMore(newUsers.length === LIMIT);

          return newUsers;
        }

        // No more users
        setHasMore(false);

        return [];
      } catch (error) {
        console.error(`Error fetching feed page ${pageNumber}:`, error);

        return [];
      } finally {
        setLoading(false);
        setLoadingNextPage(false);
      }
    },
    [dispatch, feed],
  );

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed(1, false);
    } else {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // PRELOAD NEXT PAGE
  // =====================================================

  useEffect(() => {
    if (!feed || feed.length === 0) {
      return;
    }

    /*
      IMPORTANT:

      Don't wait until the user reaches the absolute
      last profile.

      Start fetching the next 10 when only 2 profiles
      are left.

      Example:

      Current feed = 10 users

      User index 7
      ↓
      Start fetching page 2

      While user views:
      8 → 9

      page 2 is being loaded.

      Therefore there is no empty-feed gap.
    */

    const remainingUsers = feed.length - currentIndex - 1;

    if (remainingUsers <= 2 && hasMore && !loadingNextPage) {
      const nextPage = page + 1;

      getFeed(nextPage, true);
    }
  }, [currentIndex, feed, page, hasMore, loadingNextPage, getFeed]);

  // =====================================================
  // NEXT PROFILE
  // =====================================================

  const handleNext = () => {
    if (!feed || feed.length === 0) {
      return;
    }

    if (actionLoading) {
      return;
    }

    /*
      If another profile is already loaded,
      simply move to it.
    */

    if (currentIndex < feed.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    /*
      Normally this should rarely happen because
      the next page is preloaded.

      But if the user reaches the end while the
      request is still loading, don't do anything.
    */

    if (loadingNextPage) {
      return;
    }

    /*
      If there are no more users, do nothing.
    */

    if (!hasMore) {
      return;
    }

    /*
      Safety fallback:
      fetch the next page.
    */

    getFeed(page + 1, true);
  };

  // =====================================================
  // PREVIOUS PROFILE
  // =====================================================

  const handlePrevious = () => {
    if (!feed || feed.length === 0) {
      return;
    }

    if (actionLoading) {
      return;
    }

    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // =====================================================
  // INTEREST / IGNORE
  // =====================================================

  const handleConnectionAction = async (status) => {
    if (!feed || !feed[currentIndex]) {
      return;
    }

    if (actionLoading) {
      return;
    }

    const currentUser = feed[currentIndex];

    try {
      setActionLoading(true);

      /*
        INTEREST:

        POST
        /request/send/interested/:toUserId

        IGNORE:

        POST
        /request/send/ignored/:toUserId
      */

      const response = await axios.post(
        `${BASE_URL}/request/send/${status}/${currentUser._id}`,
        {},
        {
          withCredentials: true,
        },
      );

      console.log(`${status} request successful:`, response.data);

      // =================================================
      // REMOVE CURRENT USER
      // =================================================

      const updatedFeed = feed.filter((_, index) => index !== currentIndex);

      dispatch(addFeed(updatedFeed));

      // =================================================
      // HANDLE INDEX
      // =================================================

      if (updatedFeed.length === 0) {
        /*
          Normally this won't happen anymore because
          the next page is preloaded.

          But if there genuinely aren't any more users,
          show the empty state.
        */

        setCurrentIndex(0);
        return;
      }

      /*
        IMPORTANT:

        Don't decrement currentIndex when removing
        the current user.

        Example:

        [A, B, C, D]
             ↑
          currentIndex = 1

        Remove B:

        [A, C, D]
             ↑
          index = 1

        So C is automatically displayed.
      */

      if (currentIndex >= updatedFeed.length) {
        setCurrentIndex(updatedFeed.length - 1);
      }
    } catch (error) {
      console.error(`Error sending ${status} request:`, error);

      alert(error.response?.data?.message || `Unable to ${status} this user.`);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // KEYBOARD NAVIGATION
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      /*
        Don't navigate if the user is typing.
      */

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }

      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [feed, currentIndex, page, hasMore, loadingNextPage, actionLoading]);

  // =====================================================
  // INITIAL LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          min-h-[calc(100vh-80px)]
          bg-base-200
          flex
          items-center
          justify-center
        "
      >
        <div className="flex flex-col items-center gap-4">
          <span
            className="
              loading
              loading-spinner
              loading-lg
              text-primary
            "
          />

          <p className="text-sm text-base-content/50">
            Finding people for you...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY FEED
  // =====================================================

  if (!feed || feed.length === 0) {
    return (
      <div
        className="
          min-h-[calc(100vh-80px)]
          bg-base-200
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-3xl
              bg-primary/10
              text-primary
              flex
              items-center
              justify-center
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

          <h2 className="text-2xl font-bold">No new people to show</h2>

          <p className="text-base-content/50 mt-2 max-w-md">
            You've seen everyone available right now. Check back later for new
            people.
          </p>
        </div>
      </div>
    );
  }

  const currentUser = feed[currentIndex];

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className="
        min-h-[calc(100vh-80px)]
        bg-base-200
        px-3
        py-8
        md:px-6
        md:py-12
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="text-center mb-8">
        <p
          className="
            text-xs
            md:text-sm
            font-semibold
            text-primary
            uppercase
            tracking-[0.2em]
          "
        >
          Discover
        </p>

        <h1
          className="
            text-3xl
            md:text-4xl
            font-extrabold
            mt-1
          "
        >
          Find Your People
        </h1>

        <p
          className="
            text-sm
            md:text-base
            text-base-content/50
            mt-2
          "
        >
          Discover people and build meaningful connections.
        </p>
      </div>

      {/* =================================================
          CARD + ARROWS

          The arrows are part of the flex layout.

          This keeps them:
          - vertically aligned
          - outside the card
          - responsive
          - stable when card height changes
      ================================================= */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-2xl
          items-center
          justify-center
          gap-2
          md:gap-6
        "
      >
        {/* =================================================
            LEFT ARROW
        ================================================= */}

        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || actionLoading}
          aria-label="Previous profile"
          className="
            group
            flex
            h-11
            w-11
            shrink-0
            md:h-14
            md:w-14

            items-center
            justify-center

            rounded-full

            border
            border-base-300

            bg-base-100

            text-base-content/60

            shadow-lg

            transition-all
            duration-200

            hover:-translate-x-1
            hover:border-primary/40
            hover:text-primary
            hover:shadow-xl

            active:scale-95

            disabled:cursor-not-allowed
            disabled:opacity-25
            disabled:hover:translate-x-0
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="
              h-5
              w-5
              md:h-6
              md:w-6
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* =================================================
            USER CARD
        ================================================= */}

        <div
          className="
            min-w-0
            flex
            flex-1
            justify-center
          "
        >
          <UserCard
            user={currentUser}
            onInterest={() => handleConnectionAction("interested")}
            onIgnore={() => handleConnectionAction("ignored")}
            actionLoading={actionLoading}
          />
        </div>

        {/* =================================================
            RIGHT ARROW
        ================================================= */}

        <button
          type="button"
          onClick={handleNext}
          disabled={actionLoading}
          aria-label="Next profile"
          className="
            group
            flex
            h-11
            w-11
            shrink-0
            md:h-14
            md:w-14

            items-center
            justify-center

            rounded-full

            border
            border-base-300

            bg-base-100

            text-base-content/60

            shadow-lg

            transition-all
            duration-200

            hover:translate-x-1
            hover:border-primary/40
            hover:text-primary
            hover:shadow-xl

            active:scale-95

            disabled:cursor-not-allowed
            disabled:opacity-25
          "
        >
          {loadingNextPage && currentIndex >= feed.length - 2 ? (
            <span
              className="
                loading
                loading-spinner
                loading-sm
                text-primary
              "
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="
                h-5
                w-5
                md:h-6
                md:w-6
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Feed;
