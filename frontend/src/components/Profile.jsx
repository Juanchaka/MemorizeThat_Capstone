import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getUserProfile } from '../services/userService.jsx';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (err) {
      setError(`Failed to fetch user profile: ${err.message}`);
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>No profile information available.</p>
      )}
    </div>
  );
}

export default Profile;