/** @format */

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
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RandomUser } from "../utils/types";
import { RemoveRedEyeIcon } from "../assets/icons";

interface UserListingProps {
  users: RandomUser[] | null;
}

const UserListing: React.FC<UserListingProps> = ({ users }) => {

  return (
    <Box px={10}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#d4d4d4" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length === 0 ? (
              <Typography my={2} p={1}>
                No Record Found
              </Typography>
            ) : (
              users?.map((user) => (
                <TableRow key={user?.id?.value}>
                  <TableCell>{`${user.name.title} ${user.name.first} ${user.name.last}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</TableCell>
                  <TableCell>
                    <Link to='/profile' state={{ data: user }}>
                      <RemoveRedEyeIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserListing;
