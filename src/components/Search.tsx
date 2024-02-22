/** @format */

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Box display={"flex"} alignItems={"center"} gap={5}>
      <TextField
        label='Search'
        variant='outlined'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant='contained' color='primary' onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchComponent;
