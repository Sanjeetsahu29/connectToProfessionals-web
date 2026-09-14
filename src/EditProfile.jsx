import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "./utils/constant";
import { addUser } from "./utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastName: "",
    profession: "",
    about: "",
    profilePhoto: "",
    age: "",
    skills: "",
    interests: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD USER DATA
  // ==========================================

  useEffect(() => {
    if (user) {
      setFormData({
        lastName: user.lastName || "",
        profession: user.profession || "",
        about: user.about || "",
        profilePhoto: user.profilePhoto || "",
        age: user.age ?? "",
        skills: user.skills?.join(", ") || "",
        interests: user.interests?.join(", ") || "",
      });
    }
  }, [user]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous messages while editing
    if (error) {
      setError("");
    }

    if (message) {
      setMessage("");
    }
  };

  // ==========================================
  // CONVERT COMMA SEPARATED STRING TO ARRAY
  // ==========================================

  const convertToArray = (value) => {
    if (!value || !value.trim()) {
      return [];
    }

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // ==========================================
  // VALIDATE SKILLS / INTERESTS
  // ==========================================

  const validateList = (value, fieldName) => {
    // Skills and interests are optional
    if (!value || !value.trim()) {
      return null;
    }

    const items = convertToArray(value);

    // Maximum 10 items
    if (items.length > 10) {
      return `You can add a maximum of 10 ${fieldName.toLowerCase()}.`;
    }

    // Validate every item
    for (const item of items) {
      // Minimum length
      if (item.length < 2) {
        return `Each ${fieldName
          .toLowerCase()
          .slice(0, -1)} must contain at least 2 characters.`;
      }

      // Maximum length
      if (item.length > 50) {
        return `Each ${fieldName
          .toLowerCase()
          .slice(0, -1)} must be less than 50 characters.`;
      }

      // Must contain at least one letter or number
      if (!/[a-zA-Z0-9]/.test(item)) {
        return `${fieldName} must contain meaningful text.`;
      }
    }

    // Check duplicate values
    const normalizedItems = items.map((item) => item.toLowerCase());

    const uniqueItems = new Set(normalizedItems);

    if (uniqueItems.size !== normalizedItems.length) {
      return `${fieldName} cannot contain duplicate values.`;
    }

    return null;
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // ==========================================
    // LAST NAME VALIDATION
    // ==========================================

    const lastName = formData.lastName.trim();

    if (!lastName) {
      setError("Last name is required.");
      return;
    }

    if (lastName.length < 2) {
      setError("Last name must contain at least 2 characters.");
      return;
    }

    if (lastName.length > 50) {
      setError("Last name must be less than 50 characters.");
      return;
    }

    // ==========================================
    // PROFESSION VALIDATION
    // ==========================================

    const profession = formData.profession.trim();

    if (!profession) {
      setError("Profession is required.");
      return;
    }

    if (profession.length < 2) {
      setError("Profession must contain at least 2 characters.");
      return;
    }

    if (profession.length > 100) {
      setError("Profession must be less than 100 characters.");
      return;
    }

    // ==========================================
    // AGE VALIDATION
    // ==========================================

    if (formData.age === "" || formData.age === null) {
      setError("Age is required.");
      return;
    }

    const age = Number(formData.age);

    if (!Number.isInteger(age)) {
      setError("Age must be a valid whole number.");
      return;
    }

    if (age < 2) {
      setError("Age must be at least 2.");
      return;
    }

    if (age > 100) {
      setError("Age must be less than or equal to 100.");
      return;
    }

    // ==========================================
    // ABOUT VALIDATION
    // ==========================================

    const about = formData.about.trim();

    if (about.length > 500) {
      setError("About section cannot exceed 500 characters.");
      return;
    }

    // ==========================================
    // PROFILE PHOTO VALIDATION
    // ==========================================

    const profilePhoto = formData.profilePhoto.trim();

    if (profilePhoto) {
      try {
        new URL(profilePhoto);
      } catch {
        setError("Please enter a valid profile photo URL.");
        return;
      }
    }

    // ==========================================
    // SKILLS VALIDATION
    // ==========================================

    const skillsError = validateList(formData.skills, "Skills");

    if (skillsError) {
      setError(skillsError);
      return;
    }

    // ==========================================
    // INTERESTS VALIDATION
    // ==========================================

    const interestsError = validateList(formData.interests, "Interests");

    if (interestsError) {
      setError(interestsError);
      return;
    }

    // ==========================================
    // PREPARE ARRAYS
    // ==========================================

    const skills = convertToArray(formData.skills);
    const interests = convertToArray(formData.interests);

    // ==========================================
    // UPDATE DATA
    // ==========================================

    const updateData = {
      lastName,
      profession,
      about,
      profilePhoto,
      age,
      skills,
      interests,
    };

    console.log("Sending update data:", updateData);

    setLoading(true);

    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, updateData, {
        withCredentials: true,
      });

      console.log("Profile update response:", res.data);

      // ==========================================
      // UPDATE REDUX
      // ==========================================

      dispatch(addUser(res.data.user));

      // ==========================================
      // SUCCESS MESSAGE
      // ==========================================

      setMessage(res.data.message || "Profile updated successfully!");

      // ==========================================
      // NAVIGATE AFTER SUCCESS
      // ==========================================

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("Profile update error:", err);

      // ==========================================
      // BACKEND ERROR
      // ==========================================

      if (err.response) {
        const backendData = err.response.data;

        console.log("Backend error response:", backendData);

        // Multiple validation errors
        if (
          Array.isArray(backendData.errors) &&
          backendData.errors.length > 0
        ) {
          const backendErrors = backendData.errors
            .map((item) => {
              if (typeof item === "string") {
                return item;
              }

              return item.message || item.error || "Validation error";
            })
            .join(", ");

          setError(backendErrors);
        }

        // Backend error message
        else if (backendData.error) {
          setError(backendData.error);
        }

        // Backend message
        else if (backendData.message) {
          setError(backendData.message);
        }

        // Unknown backend response
        else {
          setError("Unable to update your profile. Please try again.");
        }
      }

      // ==========================================
      // SERVER NOT REACHABLE
      // ==========================================
      else if (err.request) {
        setError(
          "Unable to connect to the server. Please make sure your backend is running.",
        );
      }

      // ==========================================
      // OTHER ERROR
      // ==========================================
      else {
        setError(
          err.message || "Something went wrong while updating your profile.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ==========================================
  // COUNTS
  // ==========================================

  const skills = convertToArray(formData.skills);
  const interests = convertToArray(formData.interests);

  const skillCount = skills.length;
  const interestCount = interests.length;

  const aboutCount = formData.about.length;

  // ==========================================
  // PROFILE IMAGE
  // ==========================================

  const avatarUrl =
    formData.profilePhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${user.firstName} ${formData.lastName}`,
    )}&background=6366f1&color=fff&size=256`;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl text-primary-content shadow-lg">
                ✨
              </div>

              <div>
                <h1 className="text-3xl font-extrabold sm:text-4xl">
                  Edit Profile
                </h1>

                <p className="mt-1 text-sm text-base-content/60 sm:text-base">
                  Make your profile stand out and tell people what makes you
                  unique.
                </p>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="rounded-2xl border border-base-300 bg-base-100 px-5 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">
                  Profile
                </p>

                <p className="mt-1 font-bold text-primary">Looking good!</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ================================================= */}
            {/* PROFILE PREVIEW                                   */}
            {/* ================================================= */}

            <div className="lg:col-span-1">
              <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl">
                {/* Cover */}
                <div className="relative h-32 bg-gradient-to-r from-primary via-secondary to-accent">
                  <div className="absolute inset-0 bg-black/10"></div>

                  <div className="absolute right-4 top-4">
                    <span className="badge badge-lg border-white/30 bg-white/20 text-white backdrop-blur-md">
                      Preview
                    </span>
                  </div>
                </div>

                <div className="-mt-20 card-body items-center text-center">
                  {/* Profile Image */}

                  <div className="avatar mb-3">
                    <div className="w-32 rounded-full ring-4 ring-base-100 shadow-2xl">
                      <img
                        src={avatarUrl}
                        alt="Profile"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.firstName,
                          )}&background=6366f1&color=fff`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Name */}

                  <h2 className="text-2xl font-extrabold">
                    {user.firstName} {formData.lastName}
                  </h2>

                  {/* Profession */}

                  <p className="mt-1 font-semibold text-primary">
                    {formData.profession || "Your Profession"}
                  </p>

                  {/* Email */}

                  <p className="mt-1 text-sm text-base-content/50">
                    {user.email}
                  </p>

                  <div className="my-3 divider"></div>

                  {/* About */}

                  <div className="w-full rounded-2xl border border-base-300 bg-base-200 p-4 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        About Me
                      </p>

                      <span className="text-xs text-base-content/40">
                        {aboutCount}/500
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-base-content/70">
                      {formData.about ||
                        "Your personal introduction will appear here. Tell people a little about yourself."}
                    </p>
                  </div>

                  {/* Stats */}

                  <div className="mt-5 grid w-full grid-cols-3 gap-2">
                    <div className="rounded-2xl border border-base-300 bg-base-200 p-3">
                      <p className="text-xl font-extrabold">
                        {formData.age || "-"}
                      </p>

                      <p className="mt-1 text-xs text-base-content/50">Age</p>
                    </div>

                    <div className="rounded-2xl border border-base-300 bg-base-200 p-3">
                      <p className="text-xl font-extrabold">{skillCount}</p>

                      <p className="mt-1 text-xs text-base-content/50">
                        Skills
                      </p>
                    </div>

                    <div className="rounded-2xl border border-base-300 bg-base-200 p-3">
                      <p className="text-xl font-extrabold">{interestCount}</p>

                      <p className="mt-1 text-xs text-base-content/50">
                        Interests
                      </p>
                    </div>
                  </div>

                  {/* Skills */}

                  {skills.length > 0 && (
                    <div className="mt-5 w-full text-left">
                      <p className="mb-2 text-sm font-bold">Skills</p>

                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge badge-primary badge-outline px-3 py-3"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests */}

                  {interests.length > 0 && (
                    <div className="mt-5 w-full text-left">
                      <p className="mb-2 text-sm font-bold">Interests</p>

                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest, index) => (
                          <span
                            key={index}
                            className="badge badge-secondary badge-outline px-3 py-3"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* EDIT FORM                                         */}
            {/* ================================================= */}

            <div className="lg:col-span-2">
              <div className="card border border-base-300 bg-base-100 shadow-xl">
                <div className="card-body p-5 sm:p-7">
                  {/* Form Header */}

                  <div className="mb-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        👤
                      </div>

                      <div>
                        <h2 className="text-2xl font-extrabold">
                          Personal Information
                        </h2>

                        <p className="mt-1 text-sm text-base-content/50">
                          Update the information people see on your profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ================= FIRST + LAST NAME ================= */}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* First Name */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">First Name</span>
                      </label>

                      <input
                        type="text"
                        value={user.firstName || ""}
                        disabled
                        className="input input-bordered w-full rounded-xl bg-base-200"
                      />

                      <label className="label">
                        <span className="label-text-alt text-base-content/40">
                          🔒 First name cannot be changed
                        </span>
                      </label>
                    </div>

                    {/* Last Name */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">Last Name</span>
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        maxLength={50}
                        className="input input-bordered w-full rounded-xl focus:input-primary"
                      />

                      <label className="label">
                        <span className="label-text-alt text-base-content/40">
                          2–50 characters
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* ================= PROFESSION + AGE ================= */}

                  <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Profession */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">Profession</span>
                      </label>

                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        placeholder="e.g. Software Engineer"
                        maxLength={100}
                        className="input input-bordered w-full rounded-xl focus:input-primary"
                      />

                      <label className="label">
                        <span className="label-text-alt text-base-content/40">
                          Your current professional role
                        </span>
                      </label>
                    </div>

                    {/* Age */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">Age</span>
                      </label>

                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        min="18"
                        max="100"
                        step="1"
                        className="input input-bordered w-full rounded-xl focus:input-primary"
                      />

                      <label className="label">
                        <span className="label-text-alt text-base-content/40">
                          Age must be between 18 and 100
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* ================= PROFILE PHOTO ================= */}

                  <div className="form-control mt-3">
                    <label className="label">
                      <span className="label-text font-bold">
                        Profile Photo URL
                      </span>
                    </label>

                    <input
                      type="url"
                      name="profilePhoto"
                      value={formData.profilePhoto}
                      onChange={handleChange}
                      placeholder="https://example.com/profile.jpg"
                      className="input input-bordered w-full rounded-xl focus:input-primary"
                    />

                    <label className="label">
                      <span className="label-text-alt text-base-content/40">
                        Add a publicly accessible image URL.
                      </span>
                    </label>
                  </div>

                  {/* ================= ABOUT ================= */}

                  <div className="form-control mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <label className="text-sm font-bold">About You</label>

                        <p className="mt-1 text-xs text-base-content/45">
                          Introduce yourself and let your personality shine.
                        </p>
                      </div>

                      <span
                        className={`text-xs font-semibold ${
                          aboutCount > 450
                            ? "text-warning"
                            : "text-base-content/40"
                        }`}
                      >
                        {aboutCount}/500
                      </span>
                    </div>

                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="Write a short introduction about yourself..."
                      maxLength={500}
                      className="textarea textarea-bordered min-h-[180px] w-full resize-none rounded-2xl p-5 leading-6 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                    />

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-base-content/40">
                        Keep it authentic and meaningful.
                      </span>

                      <span className="text-xs text-base-content/40">
                        {500 - aboutCount} characters left
                      </span>
                    </div>
                  </div>

                  {/* ================= SKILLS ================= */}

                  <div className="form-control mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-bold">
                        Skills
                        <span className="ml-2 text-xs font-normal text-base-content/40">
                          Optional
                        </span>
                      </label>

                      <span
                        className={`text-xs font-medium ${
                          skillCount > 10
                            ? "text-error"
                            : "text-base-content/40"
                        }`}
                      >
                        {skillCount}/10
                      </span>
                    </div>

                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="React, Node.js, MongoDB, JavaScript"
                      className="input input-bordered w-full rounded-xl focus:input-primary"
                    />

                    <label className="label">
                      <span className="label-text-alt text-base-content/40">
                        Add up to 10 skills. Separate them using commas.
                      </span>
                    </label>
                  </div>

                  {/* ================= INTERESTS ================= */}

                  <div className="form-control mt-3">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-bold">
                        Interests
                        <span className="ml-2 text-xs font-normal text-base-content/40">
                          Optional
                        </span>
                      </label>

                      <span
                        className={`text-xs font-medium ${
                          interestCount > 10
                            ? "text-error"
                            : "text-base-content/40"
                        }`}
                      >
                        {interestCount}/10
                      </span>
                    </div>

                    <input
                      type="text"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="Technology, Cricket, Travel, Music"
                      className="input input-bordered w-full rounded-xl focus:input-primary"
                    />

                    <label className="label">
                      <span className="label-text-alt text-base-content/40">
                        Add up to 10 interests. Separate them using commas.
                      </span>
                    </label>
                  </div>

                  {/* ================= MESSAGE ================= */}

                  <div className="mt-5">
                    {/* Error */}

                    {error && (
                      <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">⚠️</span>

                          <div>
                            <p className="font-semibold text-error">
                              Unable to update profile
                            </p>

                            <p className="mt-1 text-sm text-error/80">
                              {error}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Success */}

                    {message && (
                      <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">✓</span>

                          <p className="font-semibold text-success">
                            {message}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ================= BUTTONS ================= */}

                  <div className="divider mt-7"></div>

                  <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => navigate("/profile")}
                      className="btn btn-ghost rounded-xl px-6"
                      disabled={loading}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        "✓ Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
