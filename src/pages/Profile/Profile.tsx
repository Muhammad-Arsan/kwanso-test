/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";

const Profile: React.FC = () => {
  const location = useLocation();
  const [flagUrl, setFlagUrl] = useState<string>("");

  const userData = location.state && location.state.data;

  const fetchFlag = async () => {
    if (userData?.nat) {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${userData.nat}`
        );
        const res = await response.json();
        setFlagUrl(res[0]?.flags.png);
      } catch (error) {
        console.error("Error fetching flag:", error);
      }
    }
  };

  useEffect(() => {
    fetchFlag();
  }, [userData]);

  if (!userData) {
    return <div>No user data found</div>;
  }

  console.log("PROFILE PAGE");
  

  return (
    <div>
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
          flag: flagUrl,
        }}
      />
    </div>
  );
};

export default Profile;
