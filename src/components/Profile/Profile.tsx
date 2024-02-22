/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../ProfileCard";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const location = useLocation();
  const userData = location.state && location.state.data;

  if (!userData) {
    return <div>No user data found</div>;
  }
  console.log("USER", userData);

  return (
    <div>
      <h2>User Profile</h2>
      <ProfileCard
        profile={{
          pic: userData.picture.large,
          name: `${userData.name.title} ${userData.name.first} ${userData.name.last}`,
          email: userData.email,
          calendar: new Date(userData.dob.date),
          phone: userData.phone,
          address: `${userData.location.city}, ${userData.location.state}, ${userData.location.country}`,
          lat: Number(userData.location.coordinates.latitude),
          lon: Number(userData.location.coordinates.latitude),

        }}
      />
    </div>
  );
};

export default Profile;
