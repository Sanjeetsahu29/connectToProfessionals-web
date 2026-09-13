import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "./utils/constant";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_URL}/profile/${id}`, {
        withCredentials: true,
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);

      setError(error.response?.data?.message || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/50">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-base-100 rounded-3xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-error/10 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M10.29 3.86l-7.2 12.48A1.5 1.5 0 004.39 18.6h15.22a1.5 1.5 0 001.3-2.26l-7.2-12.48a1.5 1.5 0 00-2.6 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-2">Profile unavailable</h2>

          <p className="text-base-content/50">{error}</p>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary mt-6 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-200">
      {/* ================= HERO ================= */}
      <section className="relative">
        {/* Gradient cover */}
        <div className="h-64 md:h-80 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

          {/* Decorative blur */}
          <div className="absolute -top-32 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div
            className="
              absolute
              inset-0
              opacity-10
              bg-[linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)]
              bg-[size:40px_40px]
            "
          />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="
              absolute
              top-6
              left-6
              btn
              btn-sm
              rounded-xl
              border
              border-white/20
              bg-black/20
              text-white
              backdrop-blur-xl
              hover:bg-black/30
            "
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Profile hero card */}
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="
              relative
              -mt-28
              md:-mt-32
              bg-base-100
              rounded-3xl
              shadow-2xl
              border
              border-base-300/60
              overflow-hidden
            "
          >
            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-7 md:items-end">
                {/* Profile photo */}
                <div className="relative shrink-0 self-center md:self-auto">
                  <div
                    className="
                      w-36
                      h-36
                      md:w-44
                      md:h-44
                      rounded-full
                      p-1.5
                      bg-base-100
                      shadow-2xl
                    "
                  >
                    <img
                      src={user.profilePhoto}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="
                        w-full
                        h-full
                        object-cover
                        rounded-full
                      "
                    />
                  </div>

                  {/* Friend status */}
                  <div
                    className="
                      absolute
                      bottom-3
                      right-3
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-full
                      bg-success
                      text-success-content
                      border-4
                      border-base-100
                      shadow-lg
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Name + details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                      {user.firstName} {user.lastName}
                    </h1>

                    {/* FRIEND BADGE */}
                    <span
                      className="
                        mx-auto
                        md:mx-0
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-full
                        bg-success/10
                        text-success
                        text-sm
                        font-semibold
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Friend
                    </span>
                  </div>

                  <p className="mt-2 text-base-content/55">{user.profession}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                    <span className="px-3 py-1.5 rounded-full bg-base-200 text-sm">
                      {user.age} years old
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-base-200 text-sm capitalize">
                      {user.gender}
                    </span>

                    <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {user.profession}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center md:justify-end gap-2">
                  <button
                    className="
                      btn
                      btn-primary
                      rounded-xl
                      px-6
                      shadow-lg
                      shadow-primary/20
                    "
                  >
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
                        d="M8 10h8M8 14h5m4.5 6.5L15 18H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v7a4 4 0 01-2.5 3.5z"
                      />
                    </svg>
                    Message
                  </button>

                  <button
                    className="
                      btn
                      btn-square
                      rounded-xl
                      bg-base-200
                      border-none
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
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT ================= */}

          <div className="lg:col-span-2 space-y-6">
            {/* ABOUT */}
            <section className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-sm border border-base-300/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold">About {user.firstName}</h2>

                  <p className="text-sm text-base-content/45">
                    A little about your friend
                  </p>
                </div>
              </div>

              <p className="text-base-content/70 leading-8 whitespace-pre-line">
                {user.about || "No information available."}
              </p>
            </section>

            {/* SKILLS */}
            <section className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-sm border border-base-300/60">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Skills</h2>

                  <p className="text-sm text-base-content/45 mt-1">
                    Things {user.firstName} does well
                  </p>
                </div>

                <div className="badge badge-primary badge-outline">
                  {user.skills?.length || 0}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {user.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-2xl
                      bg-base-200
                      hover:bg-primary
                      hover:text-primary-content
                      transition-all
                      duration-200
                      font-medium
                      cursor-default
                    "
                  >
                    <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-primary-content" />
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* INTERESTS */}
            <section className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-sm border border-base-300/60">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Interests</h2>

                <p className="text-sm text-base-content/45 mt-1">
                  What {user.firstName} enjoys
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {user.interests?.map((interest, index) => {
                  const icons = ["🍳", "🌍", "🔭", "🎨", "🎵", "📚"];

                  return (
                    <div
                      key={index}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        bg-base-200
                        p-5
                        border
                        border-transparent
                        hover:border-primary/20
                        hover:-translate-y-1
                        transition-all
                        duration-200
                      "
                    >
                      <div className="text-3xl mb-4">
                        {icons[index % icons.length]}
                      </div>

                      <p className="font-semibold">{interest}</p>

                      <div className="absolute -right-5 -bottom-5 w-20 h-20 rounded-full bg-primary/5 group-hover:bg-primary/10 transition" />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ================= RIGHT ================= */}

          <aside className="space-y-6">
            {/* FRIEND CARD */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-300/60">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m8-8a4 4 0 100-8 4 4 0 000 8zm6-3a3 3 0 100-6m4 14v-2a4 4 0 00-3-3.87"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold">You're friends</h3>

                  <p className="text-sm text-base-content/45">Stay connected</p>
                </div>
              </div>
            </div>

            {/* QUICK INFO */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-300/60">
              <h3 className="font-bold text-lg mb-5">Personal Info</h3>

              <div className="space-y-5">
                {/* Age */}
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    🎂
                  </div>

                  <div>
                    <p className="text-xs text-base-content/45">Age</p>

                    <p className="font-semibold mt-0.5">{user.age} years</p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                    👤
                  </div>

                  <div>
                    <p className="text-xs text-base-content/45">Gender</p>

                    <p className="font-semibold mt-0.5 capitalize">
                      {user.gender}
                    </p>
                  </div>
                </div>

                {/* Profession */}
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    💼
                  </div>

                  <div>
                    <p className="text-xs text-base-content/45">Profession</p>

                    <p className="font-semibold mt-0.5">{user.profession}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PROFILE STATS */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-300/60">
              <h3 className="font-bold text-lg mb-5">Profile</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-base-200 p-5 text-center">
                  <p className="text-2xl font-extrabold text-primary">
                    {user.skills?.length || 0}
                  </p>

                  <p className="text-xs text-base-content/45 mt-1">Skills</p>
                </div>

                <div className="rounded-2xl bg-base-200 p-5 text-center">
                  <p className="text-2xl font-extrabold text-secondary">
                    {user.interests?.length || 0}
                  </p>

                  <p className="text-xs text-base-content/45 mt-1">Interests</p>
                </div>
              </div>
            </div>

            {/* MEMBER SINCE */}
            <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 border border-primary/10">
              <p className="text-xs uppercase tracking-wider text-base-content/45 font-semibold">
                Member since
              </p>

              <p className="text-lg font-bold mt-2">
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Profile;
