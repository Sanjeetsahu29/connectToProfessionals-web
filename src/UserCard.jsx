import { useState } from "react";

const UserCard = ({ user }) => {
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
      <div className="group w-[60 vw] max-w-sm overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* ================= PROFILE IMAGE ================= */}

        <div className="relative h-80 overflow-hidden">
          <img
            src={profileImage}
            alt={fullName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                fullName,
              )}&background=6366f1&color=fff&size=400`;
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Profession */}

          {/* Name on image */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
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
              <span className="rounded-full bg-base-200 px-3 py-1.5 text-xs font-semibold">
                🎂 {user.age} years
              </span>
            )}

            {user.gender && (
              <span className="rounded-full bg-base-200 px-3 py-1.5 text-xs font-semibold capitalize">
                {user.gender}
              </span>
            )}

            {user.profession && (
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                💼 {user.profession}
              </span>
            )}
          </div>

          {/* ================= ABOUT ================= */}

          <div className="mt-5">
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-sm leading-6 text-base-content/70">
                {user.about
                  ? user.about
                  : "This user hasn't added an introduction yet."}
              </p>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}

          <div className="mt-6 grid grid-cols-3 gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-neutral rounded-xl"
            >
              View
            </button>

            <button className="btn btn-success rounded-xl text-white">
              Interested
            </button>

            <button className="btn btn-error rounded-xl text-white">
              Ignore
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/*                       VIEW MODAL                          */}
      {/* ========================================================= */}

      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-h-[92vh] max-w-3xl overflow-y-auto p-0">
            {/* ================= MODAL HEADER ================= */}

            <div className="relative">
              {/* Cover */}
              <div className="h-36 bg-gradient-to-r from-primary via-secondary to-accent sm:h-44">
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-circle btn-sm absolute right-4 top-4 border-none bg-black/30 text-white backdrop-blur-md hover:bg-black/50"
              >
                ✕
              </button>

              {/* Profile image */}
              <div className="absolute left-1/2 top-16 -translate-x-1/2 sm:top-20">
                <div className="avatar">
                  <div className="w-32 rounded-full border-4 border-base-100 bg-base-100 shadow-2xl sm:w-36">
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
              {/* Name + Profession */}
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

              {/* ================================================= */}
              {/* BASIC INFORMATION                                */}
              {/* ================================================= */}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {/* Age */}
                <div className="rounded-2xl border border-base-300 bg-base-200/50 p-4 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    🎂
                  </div>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Age
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {user.age || "Not specified"}
                  </p>
                </div>

                {/* Gender */}
                <div className="rounded-2xl border border-base-300 bg-base-200/50 p-4 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                    👤
                  </div>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Gender
                  </p>

                  <p className="mt-1 text-lg font-bold capitalize">
                    {user.gender || "Not specified"}
                  </p>
                </div>

                {/* Profession */}
                <div className="col-span-2 rounded-2xl border border-base-300 bg-base-200/50 p-4 text-center sm:col-span-1">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
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

              {/* ================================================= */}
              {/* ABOUT                                            */}
              {/* ================================================= */}

              <section className="mt-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                    👋
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      About {user.firstName}
                    </h3>

                    <p className="text-xs text-base-content/40">
                      A little more about this person
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-200/40 p-5">
                  {user.about ? (
                    <p className="whitespace-pre-line text-sm leading-7 text-base-content/70">
                      {user.about}
                    </p>
                  ) : (
                    <p className="text-sm italic text-base-content/40">
                      {user.firstName} hasn't added an introduction yet.
                    </p>
                  )}
                </div>
              </section>

              {/* ================================================= */}
              {/* SKILLS                                           */}
              {/* ================================================= */}

              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                      💻
                    </div>

                    <div>
                      <h3 className="text-lg font-bold">Skills</h3>

                      <p className="text-xs text-base-content/40">
                        {skills.length}{" "}
                        {skills.length === 1 ? "skill" : "skills"}
                      </p>
                    </div>
                  </div>
                </div>

                {skills.length > 0 ? (
                  <div className="rounded-2xl border border-base-300 bg-base-200/40 p-5">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-base-300 bg-base-200/40 p-5">
                    <p className="text-sm text-base-content/40">
                      No skills have been added yet.
                    </p>
                  </div>
                )}
              </section>

              {/* ================================================= */}
              {/* INTERESTS                                         */}
              {/* ================================================= */}

              <section className="mt-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-lg">
                    ❤️
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">Interests</h3>

                    <p className="text-xs text-base-content/40">
                      Things {user.firstName} enjoys
                    </p>
                  </div>
                </div>

                {interests.length > 0 ? (
                  <div className="rounded-2xl border border-base-300 bg-base-200/40 p-5">
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-base-300 bg-base-200/40 p-5">
                    <p className="text-sm text-base-content/40">
                      No interests have been added yet.
                    </p>
                  </div>
                )}
              </section>

              {/* ================================================= */}
              {/* PROFILE SUMMARY                                   */}
              {/* ================================================= */}

              <section className="mt-7">
                <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-extrabold text-primary">
                        {skills.length}
                      </p>

                      <p className="mt-1 text-xs text-base-content/50">
                        Skills
                      </p>
                    </div>

                    <div className="border-x border-base-300">
                      <p className="text-2xl font-extrabold text-secondary">
                        {interests.length}
                      </p>

                      <p className="mt-1 text-xs text-base-content/50">
                        Interests
                      </p>
                    </div>

                    <div>
                      <p className="text-2xl font-extrabold text-accent">
                        {user.about ? "✓" : "—"}
                      </p>

                      <p className="mt-1 text-xs text-base-content/50">About</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ================================================= */}
              {/* MODAL ACTIONS                                    */}
              {/* ================================================= */}

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost rounded-xl"
                >
                  Close
                </button>

                <button
                  className="btn btn-success rounded-xl text-white"
                  onClick={() => {
                    console.log("Interested:", user._id);
                  }}
                >
                  Interested
                </button>

                <button
                  className="btn btn-error rounded-xl text-white"
                  onClick={() => {
                    console.log("Ignored:", user._id);
                    setShowModal(false);
                  }}
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>

          {/* Click outside modal */}
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
        </dialog>
      )}
    </>
  );
};

export default UserCard;
