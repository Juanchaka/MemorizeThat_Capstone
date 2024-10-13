import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getUserProfile, updateUser, deleteUser } from "../services/userService.jsx";
import "../styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      const userData = await getUserProfile();
      setProfile(userData);
      setUsername(userData.username);
      setEmail(userData.email);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user profile");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const updatedProfile = await updateUser({ username, email });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUser();
        logout();
        setProfile(null);
        setError("Account successfully deleted. Redirecting...");
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>User Profile</h2>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="center-message">Loading...</div>
        ) : profile ? (
          isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="button-group">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => {
                  setIsEditing(false);
                  setError(null);
                  setUsername(profile.username);
                  setEmail(profile.email);
                }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-column">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
              <div className="button-column">
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button onClick={handleDelete}>Delete Account</button>
              </div>
            </div>
          )
        ) : (
          <p className="center-message">No profile information available.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
