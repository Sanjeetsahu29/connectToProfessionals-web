import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constant";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    profession: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, gender, profession } =
      formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !gender ||
      !profession.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
        withCredentials: true,
      });
      console.log(response.data);
      setSuccess(response.data.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong while creating your account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/20">
        <div className="grid lg:grid-cols-2">
          {/* ================= LEFT - BRANDING ================= */}

          <div className="hidden lg:flex relative overflow-hidden bg-blue-600 p-12 text-white">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

            <div className="relative z-10 flex w-full flex-col justify-between">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-100">
                  Join the community
                </p>

                <h2 className="max-w-md text-4xl font-bold leading-tight">
                  Connect.
                  <br />
                  Collaborate.
                  <br />
                  Grow.
                </h2>

                <p className="mt-5 max-w-md text-base leading-relaxed text-blue-100">
                  Create your profile, discover professionals and build
                  meaningful connections that help you grow.
                </p>

                <div className="mt-8 space-y-4">
                  {/* Feature 1 */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
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
                          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-.956 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.003a24.12 24.12 0 0 1-3.013.22c-1.052 0-2.078-.08-3.078-.22m6.09-.003a9.378 9.378 0 0 0-2.625.372M12 15.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8.625 3.42a4.125 4.125 0 0 1 7.533-2.493"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Discover professionals
                      </p>

                      <p className="text-xs text-blue-100">
                        Find people with similar interests and skills.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
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
                          d="M8.25 9.75h7.5m-7.5 4.5h4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Build connections</p>

                      <p className="text-xs text-blue-100">
                        Connect with people who can inspire you.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
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
                          d="M3 13.5 7.5 9l4.5 4.5L21 4.5M21 4.5v6m0-6h-6"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Grow your network</p>

                      <p className="text-xs text-blue-100">
                        Turn conversations into opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-9 w-9 rounded-full border-2 border-blue-600 bg-slate-200" />
                    <div className="h-9 w-9 rounded-full border-2 border-blue-600 bg-slate-300" />
                    <div className="h-9 w-9 rounded-full border-2 border-blue-600 bg-slate-400" />
                  </div>

                  <p className="text-sm text-blue-100">
                    Your professional network starts here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT - FORM ================= */}

          <div className="p-6 sm:p-10 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              {/* Header */}
              <div className="mb-7">
                <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  JOIN THE COMMUNITY
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Create account
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Create your profile and start building your network.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-400">
                  {success}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                {/* First + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      First name
                    </label>

                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      autoComplete="given-name"
                      className="
                        w-full rounded-xl
                        border border-slate-300
                        bg-white px-4 py-3
                        text-sm text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-4 focus:ring-blue-500/10
                        dark:border-neutral-700
                        dark:bg-neutral-800
                        dark:text-white
                        dark:placeholder:text-neutral-500
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Last name
                    </label>

                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      autoComplete="family-name"
                      className="
                        w-full rounded-xl
                        border border-slate-300
                        bg-white px-4 py-3
                        text-sm text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-4 focus:ring-blue-500/10
                        dark:border-neutral-700
                        dark:bg-neutral-800
                        dark:text-white
                        dark:placeholder:text-neutral-500
                      "
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Email address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="
                      w-full rounded-xl
                      border border-slate-300
                      bg-white px-4 py-3
                      text-sm text-slate-900
                      outline-none transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:ring-4 focus:ring-blue-500/10
                      dark:border-neutral-700
                      dark:bg-neutral-800
                      dark:text-white
                      dark:placeholder:text-neutral-500
                    "
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      className="
                        w-full rounded-xl
                        border border-slate-300
                        bg-white px-4 py-3 pr-16
                        text-sm text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-4 focus:ring-blue-500/10
                        dark:border-neutral-700
                        dark:bg-neutral-800
                        dark:text-white
                        dark:placeholder:text-neutral-500
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="
                        absolute right-3 top-1/2
                        -translate-y-1/2
                        rounded-lg px-2 py-1
                        text-xs font-medium
                        text-slate-500
                        hover:text-slate-900
                        dark:text-slate-400
                        dark:hover:text-white
                      "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Gender + Profession */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="gender"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Gender
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="
                        w-full rounded-xl
                        border border-slate-300
                        bg-white px-4 py-3
                        text-sm text-slate-900
                        outline-none transition
                        focus:border-blue-500
                        focus:ring-4 focus:ring-blue-500/10
                        dark:border-neutral-700
                        dark:bg-neutral-800
                        dark:text-white
                      "
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="profession"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Profession
                    </label>

                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      placeholder="Developer"
                      className="
                        w-full rounded-xl
                        border border-slate-300
                        bg-white px-4 py-3
                        text-sm text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-4 focus:ring-blue-500/10
                        dark:border-neutral-700
                        dark:bg-neutral-800
                        dark:text-white
                        dark:placeholder:text-neutral-500
                      "
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-2 w-full rounded-xl
                    bg-blue-600 px-4 py-3
                    text-sm font-semibold text-white
                    shadow-sm
                    transition-all duration-200
                    hover:bg-blue-700
                    hover:shadow-md
                    focus:outline-none
                    focus:ring-4 focus:ring-blue-500/20
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-semibold
                    text-blue-600
                    hover:text-blue-700
                    hover:underline
                    dark:text-blue-400
                  "
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
