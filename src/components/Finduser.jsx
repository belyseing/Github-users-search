import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt, FaLink, FaTwitter } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

export default function FindUser() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchUserData = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("No results");
      }
      const data = await response.json();
      setUserData(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (userName.trim()) {
      fetchUserData(userName);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userName.trim()) {
      fetchUserData(userName);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Joined ${date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-white" : "bg-blue-50 text-black"
      }`}
    >
      <div className="w-full max-w-lg space-y-4 px-4 sm:px-6 md:px-8 lg:max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1
            className={`text-2xl font-bold font-spacemono font-serif${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            devfinder
          </h1>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-sm font-medium group"
          >
            <span
              className={`${
                darkMode
                  ? "text-white"
                  : "text-gray-400  font-spacemono font-normal"
              } group-hover:${darkMode ? "text-indigo-400" : "text-black"}`}
            >
              {darkMode ? "LIGHT" : "DARK"}
            </span>
            {darkMode ? (
              <MdSunny className="w-5 h-5 text-white group-hover:text-indigo-400" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-400 group-hover:text-black" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full  font-spacemono font-normal">
          <CiSearch
            className={`absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 text-3xl`}
          />
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`py-4 pl-16 pr-28 shadow-lg rounded-lg focus:outline-none w-full  ${
              darkMode
                ? "bg-slate-800 border-gray-600 text-white placeholder-gray-100 focus:ring-2 focus:ring-slate-700"
                : "bg-white border-gray-300 text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-gray-100"
            }`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {error && <p className="text-red-500 text-xl mr-3">{error}</p>}
            <button
              onClick={handleSearch}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg text-sm ${
                userName.trim() && !error
                  ? "cursor-not-allowed opacity-60"
                  : "hover:bg-blue-400 "
              }`}
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading, Error,and Avatar */}
        {loading && (
          <div
            className={`text-center p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <p>Loading...</p>
          </div>
        )}

        {userData && !loading && !error && (
          <div
            className={`rounded-xl shadow-lg p-4 sm:p-6 overflow-hidden ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div className="flex flex-row items-start gap-3 sm:gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex-shrink-0">
                <img
                  src={userData?.avatar_url || "/images/Bitmap.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Profile part */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col  sm:flex-row text-start justify-between items-start">
                  <div className="text-start font-spacemono font-bold">
                    <h2
                      className={`text-lg sm:text-xl font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {userData.name || "No Name"}
                    </h2>
                    <p className="text-blue-500 text-sm font-spacemono font-normal">
                      @{userData.login}
                    </p>
                  </div>
                  <p
                    className={`text-xs  font-spacemono font-normal sm:text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {formatDate(userData.created_at)}
                  </p>
                </div>
                <p
                  className={`text-xs  font-spacemono sm:text-sm text-start break-words ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {userData.bio || "This profile has no bio"}
                </p>

                <div
                  className={`rounded-lg px-4  font-spacemono font-normal sm:px-4 py-1 sm:py-4 mt-4 flex justify-between gap-4 sm:gap-0 sm:justify-around ${
                    darkMode ? "bg-slate-900" : "bg-blue-50"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className={`text-xs sm:text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Repos
                    </p>
                    <p
                      className={`text-base sm:text-lg font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {userData.public_repos}
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs sm:text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Followers
                    </p>
                    <p
                      className={`text-base sm:text-lg font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {userData.followers}
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs sm:text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Following
                    </p>
                    <p
                      className={`text-base sm:text-lg font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {userData.following}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs sm:text-sm  font-spacemono font-normal">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt
                      className={darkMode ? "text-white" : "text-blue-950"}
                    />
                    <p className={darkMode ? "text-gray-300" : "text-gray-500"}>
                      {userData.location || "Not Available"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTwitter
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    />
                    <a
                      href={
                        userData.twitter_username
                          ? `https://twitter.com/${userData.twitter_username}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={darkMode ? "text-gray-400" : "text-gray-300"}
                    >
                      {userData.twitter_username || "Not Available"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLink
                      className={darkMode ? "text-white" : "text-blue-950"}
                    />
                    <a
                      href={userData.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      } hover:underline truncate`}
                    >
                      {userData.blog || "Not Available"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiBuildingOffice2
                      className={darkMode ? "text-white" : "text-blue-950"}
                    />
                    <a
                      href={userData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      @{userData.login}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
