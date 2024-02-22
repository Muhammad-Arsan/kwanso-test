/** @format */

import React, { useEffect, useState } from "react";
import SearchComponent from "../Search";
import UserListing from "../UserListings";
import PaginationComponent from "../Pagination";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
const ITEMS_PER_PAGE = 10;

export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const Home: React.FC = () => {
  const [randomUsers, setRandomUsers] = useState<RandomUser[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, gender]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=${currentPage}&results=${ITEMS_PER_PAGE}&gender=${gender}&${searchQuery}`
      );
      const data = await response.json();
      setRandomUsers(data.results);
    } catch (error) {
      console.error("Error fetching random users:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value as string);
  };

  const filteredUsers =
    randomUsers?.filter(
      (user) =>
        user.name.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  console.log("first", filteredUsers);

  return (
    <div>
      <Box my={5} px={10} display={"flex"} justifyContent={"space-between"}>
        <SearchComponent onSearch={handleSearch} />
        <Box mt={2} mb={2} width={"200px"}>
          <FormControl fullWidth>
            <InputLabel id='gender-filter-label'>Gender</InputLabel>
            <Select
              labelId='gender-filter-label'
              id='gender-filter'
              value={gender || ""}
              onChange={handleGenderChange}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <UserListing users={filteredUsers} />
      <PaginationComponent
        totalPages={10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
