/** @format */

import React, { useEffect, useState } from "react";
import SearchComponent from "../../components/Search";
import UserListing from "../../components/UserListings";
import PaginationComponent from "../../components/Pagination";
import {
  Box,
  FormControl,
  CircularProgress,
  Autocomplete,
  TextField,
  FormLabel,
} from "@mui/material";
import { RandomUser } from "../../utils/types";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<RandomUser[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, gender]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://randomuser.me/api/?page=${currentPage}&results=${10}&gender=${gender}}`
      );
      const data = await response.json();
      setUsers(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleGenderChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setGender(value);
  };

  const lowercasedQuery = searchQuery.toLowerCase();

  const filteredUsers =
    users?.filter((user) => {
      const fullName =
        `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery)
      );
    }) || [];

  const options = ["male", "female"];

console.log("HOME PAGE");


  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box my={5} px={10} display={"flex"} justifyContent={"space-between"}>
            <SearchComponent onSearch={handleSearch} />
            <Box mt={2} mb={2}>
              <FormControl fullWidth>
                <FormLabel id='gender-filter-label'>Gender</FormLabel>

                <Autocomplete
                  onChange={(event, value) => handleGenderChange(event, value)}
                  disablePortal
                  options={options}
                  value={gender}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder='Select Gender' />
                  )}
                />
              </FormControl>
            </Box>
          </Box>
          <UserListing users={filteredUsers} />
          {filteredUsers?.length > 0 && (
            <PaginationComponent
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Home;
