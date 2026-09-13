import { useState } from "react";

const UserCard = ({ user, onInterest, onIgnore, actionLoading }) => {
  const [showModal, setShowModal] = useState(false);

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const skills = Array.isArray(user.skills) ? user.skills : [];

  const interests = Array.isArray(user.interests) ? user.interests : [];

  const profileImage =
    user.profilePhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName,
    )}&background=6366f1&color=fff&size=400`;

  return (
    <>
      {/* =====================================================
          USER CARD
      ===================================================== */}

      <div
        className="
          group
          w-full
          max-w-sm
          overflow-hidden
          rounded-3xl
          border
          border-base-300
          bg-base-100
          shadow-md
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-2xl
        "
      >
        {/* ================= PROFILE IMAGE ================= */}

        <div className="relative h-80 overflow-hidden">
          <img
            src={profileImage}
            alt={fullName}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                fullName,
              )}&background=6366f1&color=fff&size=400`;
            }}
          />

          {/* Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/10
              to-transparent
            "
          />

          {/* Name */}

          <div
            className="
              absolute
              bottom-5
              left-5
              right-5
              text-white
            "
          >
            <h2 className="text-2xl font-extrabold tracking-tight">
              {fullName}
            </h2>

            {user.profession && (
              <p className="mt-1 text-sm text-white/80">{user.profession}</p>
            )}
          </div>
        </div>

        {/* ================= CARD BODY ================= */}

        <div className="p-5">
          {/* Basic information */}

          <div className="flex flex-wrap gap-2">
            {user.age && (
              <span
                className="
                  rounded-full
                  bg-base-200
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                "
              >
                🎂 {user.age} years
              </span>
            )}

            {user.gender && (
              <span
                className="
                  rounded-full
                  bg-base-200
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  capitalize
                "
              >
                👤 {user.gender}
              </span>
            )}

            {user.profession && (
              <span
                className="
                  rounded-full
                  bg-primary/10
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-primary
                "
              >
                💼 {user.profession}
              </span>
            )}
          </div>

          {/* ================= ABOUT ================= */}

          <div className="mt-5">
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-sm leading-6 text-base-content/70 line-clamp-4">
                {user.about
                  ? user.about
                  : "This user hasn't added an introduction yet."}
              </p>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}

          <div className="mt-6 grid grid-cols-3 gap-2">
            {/* VIEW */}

            <button
              onClick={() => setShowModal(true)}
              disabled={actionLoading}
              className="
                btn
                btn-neutral
                rounded-xl
              "
            >
              View
            </button>

            {/* INTERESTED */}

            <button
              onClick={onInterest}
              disabled={actionLoading}
              className="
                btn
                btn-success
                rounded-xl
                text-white
              "
            >
              {actionLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                  Interested
                </>
              )}
            </button>

            {/* IGNORE */}

            <button
              onClick={onIgnore}
              disabled={actionLoading}
              className="
                btn
                btn-error
                rounded-xl
                text-white
              "
            >
              {actionLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
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

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div
            className="
              modal-box
              max-h-[92vh]
              max-w-3xl
              overflow-y-auto
              p-0
            "
          >
            {/* ================= MODAL HEADER ================= */}

            <div className="relative">
              <div
                className="
                  h-36
                  bg-gradient-to-r
                  from-primary
                  via-secondary
                  to-accent
                  sm:h-44
                "
              />

              {/* CLOSE */}

              <button
                onClick={() => setShowModal(false)}
                className="
                  btn
                  btn-circle
                  btn-sm
                  absolute
                  right-4
                  top-4
                  border-none
                  bg-black/30
                  text-white
                  backdrop-blur-md
                  hover:bg-black/50
                "
              >
                ✕
              </button>

              {/* Profile image */}

              <div
                className="
                  absolute
                  left-1/2
                  top-16
                  -translate-x-1/2
                  sm:top-20
                "
              >
                <div className="avatar">
                  <div
                    className="
                      w-32
                      rounded-full
                      border-4
                      border-base-100
                      bg-base-100
                      shadow-2xl
                      sm:w-36
                    "
                  >
                    <img
                      src={profileImage}
                      alt={fullName}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          fullName,
                        )}&background=6366f1&color=fff&size=400`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= MODAL CONTENT ================= */}

            <div className="px-5 pb-6 pt-24 sm:px-8 sm:pt-28">
              {/* Name */}

              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  {fullName}
                </h2>

                {user.profession && (
                  <p className="mt-1 text-base font-semibold text-primary">
                    {user.profession}
                  </p>
                )}

                <p className="mt-2 text-sm text-base-content/50">
                  Get to know {user.firstName || "this user"} better
                </p>
              </div>

              {/* BASIC INFORMATION */}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {/* AGE */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-200/50
                    p-4
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                    "
                  >
                    🎂
                  </div>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Age
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {user.age || "Not specified"}
                  </p>
                </div>

                {/* GENDER */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-200/50
                    p-4
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-secondary/10
                    "
                  >
                    👤
                  </div>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Gender
                  </p>

                  <p className="mt-1 text-lg font-bold capitalize">
                    {user.gender || "Not specified"}
                  </p>
                </div>

                {/* PROFESSION */}

                <div
                  className="
                    col-span-2
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-200/50
                    p-4
                    text-center
                    sm:col-span-1
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-accent/10
                    "
                  >
                    💼
                  </div>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Profession
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {user.profession || "Not specified"}
                  </p>
                </div>
              </div>

              {/* ABOUT */}

              <section className="mt-7">
                <h3 className="text-lg font-bold">About {user.firstName}</h3>

                <div
                  className="
                    mt-3
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-200/40
                    p-5
                  "
                >
                  <p className="whitespace-pre-line text-sm leading-7 text-base-content/70">
                    {user.about ||
                      `${user.firstName} hasn't added an introduction yet.`}
                  </p>
                </div>
              </section>

              {/* SKILLS */}

              {skills.length > 0 && (
                <section className="mt-7">
                  <h3 className="text-lg font-bold">Skills</h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                          rounded-full
                          border
                          border-primary/20
                          bg-primary/10
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-primary
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* INTERESTS */}

              {interests.length > 0 && (
                <section className="mt-7">
                  <h3 className="text-lg font-bold">Interests</h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <span
                        key={index}
                        className="
                          rounded-full
                          border
                          border-secondary/20
                          bg-secondary/10
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-secondary
                        "
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* ================= MODAL ACTIONS ================= */}

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost rounded-xl"
                  disabled={actionLoading}
                >
                  Close
                </button>

                {/* INTEREST */}

                <button
                  onClick={() => {
                    onInterest();
                    setShowModal(false);
                  }}
                  disabled={actionLoading}
                  className="
                    btn
                    btn-success
                    rounded-xl
                    text-white
                  "
                >
                  {actionLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                      Interested
                    </>
                  )}
                </button>

                {/* IGNORE */}

                <button
                  onClick={() => {
                    onIgnore();
                    setShowModal(false);
                  }}
                  disabled={actionLoading}
                  className="
                    btn
                    btn-error
                    rounded-xl
                    text-white
                  "
                >
                  {actionLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
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

          {/* Click outside */}

          <div
            className="modal-backdrop"
            onClick={() => {
              if (!actionLoading) {
                setShowModal(false);
              }
            }}
          />
        </dialog>
      )}
    </>
  );
};

export default UserCard;
