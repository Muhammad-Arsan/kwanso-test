/** @format */

// src/components/UserListing.tsx

import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RandomUser } from "./Home/Home";
import { Link } from "react-router-dom";

interface UserListingProps  {
  users: RandomUser[] | null;
}

const UserListing: React.FC<UserListingProps> = ({ users }) => {
  return (
    <Box px={10}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Profile</TableCell>

              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{`${user.name.title} ${user.name.first} ${user.name.last}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</TableCell>
                <TableCell>
                  {/* <Link to={{ pathname: "/profile", state: { data: user }}}>View Profile</Link> */}
                  <Link to= "/profile" state= {{ data: user }}>View Profile</Link>

                </TableCell>

                {/* Add more cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserListing;
