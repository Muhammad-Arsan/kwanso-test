/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface ProfileCardProps {
  profile: {
    pic: string;
    name: string;
    email: string;
    calendar: Date;
    phone: string;
    address: string;
    lat: number;
    lon: number;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  console.log("profile", profile);
  console.log("Latitude:", profile.lat);
  console.log("Longitude:", profile.lon);

  const [activeIcon, setActiveIcon] = useState<string>("name");
//   const [map, setMap] = useState<string>("");
const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
  };
  const formattedDate = profile.calendar.toLocaleDateString();

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };

  useEffect(() => {
    if (!map) return;

    const newMarker = new window.google.maps.Marker({
      position: {
        lat: profile.lat,
        lng: profile.lon,
      },
      map: map,
    });

    const infoWindowContent = `
    <div>
    </div>
  `;

    const infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent,
    });

    newMarker.addListener("click", () => {
      infoWindow.open(map, newMarker);
    });
  }, [map]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label='profile-avatar' src={profile.pic} />}
        title={activeIcon === "calendar" ? formattedDate : profile[activeIcon]}
        subheader={profile.email}
      />

      {activeIcon === "address" && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{
            lat: profile.lat,
            lng: profile.lon,
          }}
        //   zoom={11}
        zoom={11}
          onLoad={(map) => setMap(map)}
          onUnmount={onUnmount}
        >
          {map && (
            <Marker
              position={{
                lat: profile.lat,
                lng: profile.lon,
              }}
            />
          )}
        </GoogleMap>
        // <LoadScript googleMapsApiKey='AIzaSyCJdaGfHZZEt1heuVb5Hpoe6pZLh61UlEA'>
        //   <GoogleMap
        //     mapContainerStyle={mapContainerStyle}
        //     center={{ lat: profile.lat, lng: profile.lon }}
        //     zoom={15}
        //   >
        //     <Marker position={{ lat: profile.lat, lng: profile.lon }} />
        //   </GoogleMap>
        // </LoadScript>
      )}

      <CardContent>
        <Tooltip title='Name' arrow>
          <IconButton
            onMouseOver={() => handleIconClick("name")}
            color={activeIcon === "name" ? "primary" : "default"}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Email' arrow>
          <IconButton
            onMouseOver={() => handleIconClick("email")}
            color={activeIcon === "email" ? "primary" : "default"}
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Calendar' arrow>
          <IconButton
            onMouseOver={() => handleIconClick("calendar")}
            color={activeIcon === "calendar" ? "primary" : "default"}
          >
            <CalendarTodayIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Phone' arrow>
          <IconButton
            onMouseOver={() => handleIconClick("phone")}
            color={activeIcon === "phone" ? "primary" : "default"}
          >
            <PhoneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Address' arrow>
          <IconButton
            onMouseOver={() => handleIconClick("address")}
            color={activeIcon === "address" ? "primary" : "default"}
          >
            <LocationOnIcon />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
