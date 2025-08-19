"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  const router = useRouter();
  const { data: session, status } = useSession();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Show role modal after Google sign-in
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setGoogleUser({
        email: session.user.email || "",
        name: session.user.name || "",
        googleToken: session.accessToken || "",
      });
      setShowRoleModal(true);
    }
  }, [status, session]);

  // Form validation
  const validateForm = (isGoogleAuth) => {
    const errors = {};

    if (!isGoogleAuth) {
      if (!email && !phone) {
        errors.email = "Please provide either an email or phone number";
        errors.phone = "Please provide either an email or phone number";
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email format";
      }
      if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
        errors.phone = "Invalid phone number";
      }
      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    if (role === "TEACHER") {
      if (!subject) errors.subject = "Subject is required";
      if (!experience || isNaN(Number(experience)) || Number(experience) < 0) {
        errors.experience = "Please enter a valid number of years";
      }
      if (coverImage && !/^https?:\/\/.+$/.test(coverImage)) {
        errors.coverImage = "Invalid URL";
      }
      if (profileImage && !/^https?:\/\/.+$/.test(profileImage)) {
        errors.profileImage = "Invalid URL";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Google Sign-In
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/register" });
  };

  // Register after role selection (Google flow)
  const handleRoleSelect = async () => {
    if (!validateForm(true)) return;
    await submitRegistration(true);
  };

  // Manual registration submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(false)) return;
    await submitRegistration(false);
  };

  // Common registration request
  const submitRegistration = async (isGoogleAuth) => {
    setLoading(true);
    setError("");

    const teacherDetails =
      role === "TEACHER"
        ? {
            subject,
            experience: Number(experience),
            coverImage: coverImage || "https://via.placeholder.com/150",
            profileImage: profileImage || "https://via.placeholder.com/50",
            bio: bio || "",
            qualifications: { degree: subject || "Sample Degree" },
            subjects: subject ? [subject] : [],
            allowedCountries: [],
            restrictedCountries: [],
          }
        : {};

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: isGoogleAuth ? googleUser?.email : email,
          phone: isGoogleAuth ? undefined : phone,
          password: isGoogleAuth ? undefined : password,
          name: isGoogleAuth ? googleUser?.name : name,
          role,
          teacherDetails,
          googleToken: isGoogleAuth ? googleUser?.googleToken : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
      setShowRoleModal(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-700 p-3 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 mb-4"
          disabled={loading}
        >
          <svg className="w-6 h-6" viewBox="0 0 48 48">
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M24 44c5.74 0 10.57-2.13 14.05-5.78l-7.42-5.78c-2.14 1.43-4.83 2.28-7.63 2.28-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 44 24 44z"
            />
            <path
              fill="#FBBC05"
              d="M46.98 24.55c0-1.63-.15-3.2-.43-4.72H24v9.45h13.12c-.57 3.03-2.3 5.6-4.87 7.32l7.42 5.78c4.49-4.14 7.31-10.29 7.31-17.83z"
            />
            <path
              fill="#EA4335"
              d="M10.53 19.41l-7.98-6.19C1.14 16.06 0 19.88 0 24s1.14 7.94 2.56 10.78l7.98-6.19c-.89-2.74-.89-5.85 0-8.59z"
            />
          </svg>
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-600 mb-4">or</p>

        {/* Manual Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="w-full p-3 border rounded-md"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className={`w-full p-3 border rounded-md ${
              fieldErrors.email ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500">{fieldErrors.email}</p>
          )}

          {/* Phone */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            className={`w-full p-3 border rounded-md ${
              fieldErrors.phone ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.phone && (
            <p className="text-xs text-red-500">{fieldErrors.phone}</p>
          )}

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full p-3 border rounded-md ${
              fieldErrors.password ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-500">{fieldErrors.password}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className={`w-full p-3 border rounded-md ${
              fieldErrors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-red-500">
              {fieldErrors.confirmPassword}
            </p>
          )}

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>

          {/* Teacher Fields */}
          {role === "TEACHER" && (
            <>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience (years)"
                className="w-full p-3 border rounded-md"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* Role Modal for Google */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Select Your Role</h2>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-md mb-4"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>

            {role === "TEACHER" && (
              <>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full p-3 border rounded-md mb-4"
                />
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Experience (years)"
                  className="w-full p-3 border rounded-md mb-4"
                />
              </>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 bg-gray-300 p-3 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleSelect}
                className="flex-1 bg-blue-600 text-white p-3 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
