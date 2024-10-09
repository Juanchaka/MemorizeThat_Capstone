import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userService';

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile(user.id);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      await updateUserProfile(user.id, updatedData);
      fetchUserProfile();
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <p>Total Games: {profile.totalGames}</p>
        <p>Highest Score: {profile.highestScore}</p>
      </div>
    </div>
  );
}

export default Profile;