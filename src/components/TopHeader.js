import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../services/firebase";

function TopHeader() {
  const navigate = useNavigate();
  const { signOutUser, fetchCurrentUserProfile, user } = useFirebase();
  const [userName, setUserName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");

  // Check if user is authenticated before proceeding
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const data = await fetchCurrentUserProfile();
          if (data) {
            setUserName(data.userName || "");
            setUserProfilePic(data.profileURL || "");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [user, fetchCurrentUserProfile]);

  const handleLogout = () => {
    signOutUser();
  };

  return (
    <div className="w-full lg:w-4/5 lg:px-3 py-2 flex items-start justify-center flex-col-reverse">
      <div className="w-full flex items-center justify-start md:justify-start p-1 cursor-pointer relative z-50 gap-2">
        {/* Display user profile pic */}
        <div
          className="text-white"
          onClick={() => {
            if (user?.uid) {
              navigate(`/userProfile/${user.uid}`);
            }
          }}
        >
          <img
            src={userProfilePic }
            alt="userPic"
            onError={(e) => (e.target.src = '/user.png')}
            className="object-cover rounded-full w-10"
          />
        </div>
        {/* Display user name or default */}
        <div className="">
          <p className="text-xs text-gray-600">Welcome back</p>
          <h2 className="text-md text-black font-semibold lg:flex">
            {userName || user?.displayName || "User"}
          </h2>
        </div>
      </div>
      {/* Logout button */}
      <button onClick={handleLogout} className="text-white bg-red-500 p-2 rounded">
        Log Out
      </button>
    </div>
  );
}

export default TopHeader;
