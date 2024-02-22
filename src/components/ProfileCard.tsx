/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  IconButton,
  Container,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import {
  PersonIcon,
  EmailIcon,
  AddLocationAltIcon,
  PhoneIcon,
  EventIcon,
  FlagIcon,
} from "../assets/icons";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { ProfileCardProps } from "../utils/types";

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [activeIcon, setActiveIcon] = useState<string>("name");
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

    newMarker.addListener("click", () => {});
  }, [map]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      ``{" "}
      <Card
        sx={{
          width: "100%",
          maxWidth: "600px",
          mx: "auto",
          my: 2,
          textAlign: "center",
          paddingY: 7,
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardContent sx={{ position: "relative" }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              border: "4px solid",
              borderColor: "background.paper",
              position: "absolute",
              top: "-5px",
              left: "calc(50% - 45px)",
              backgroundColor: "primary.light",
            }}
            src={profile.pic}
            alt='Profile Picture'
          />
          <Typography
            variant='h6'
            color='text.secondary'
            fontWeight='light'
            sx={{ mt: 10 }}
          >
            My {activeIcon} is
          </Typography>
          <Typography
            variant='h4'
            fontWeight='bold'
            color='text.secondary'
            sx={{ my: 1 }}
          >
            {activeIcon === "birthday" ? formattedDate : profile[activeIcon]}
          </Typography>
          <Box>
            {activeIcon === "address" && (
              <Container>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{
                    lat: profile.lat,
                    lng: profile.lon,
                  }}
                  zoom={1}
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
              </Container>
            )}

            {activeIcon === "country" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginY: 5,
                }}
              >
                <img src={profile.flag} width={150} alt='Country Flag' />
              </Box>
            )}
          </Box>
          <Stack direction='row' justifyContent='center' spacing={2}>
            <IconButton
              aria-label='profile'
              onMouseOver={() => handleIconClick("name")}
              color={activeIcon === "name" ? "primary" : "default"}
            >
              <PersonIcon />
            </IconButton>
            <IconButton
              aria-label='email'
              onMouseOver={() => handleIconClick("email")}
              color={activeIcon === "email" ? "primary" : "default"}
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              aria-label='calendar'
              onMouseOver={() => handleIconClick("birthday")}
              color={activeIcon === "birthday" ? "primary" : "default"}
            >
              <EventIcon />
            </IconButton>
            <IconButton
              aria-label='phone'
              onMouseOver={() => handleIconClick("phone")}
              color={activeIcon === "phone" ? "primary" : "default"}
            >
              <PhoneIcon />
            </IconButton>
            <IconButton
              aria-label='phone'
              onMouseOver={() => handleIconClick("address")}
              color={activeIcon === "address" ? "primary" : "default"}
            >
              <AddLocationAltIcon />
            </IconButton>{" "}
            <IconButton
              aria-label='phone'
              onMouseOver={() => handleIconClick("country")}
              color={activeIcon === "country" ? "primary" : "default"}
            >
              <FlagIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileCard;
