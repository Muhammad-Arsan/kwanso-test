// src/components/PaginationComponent.tsx

import React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
    </Box>
  );
};

export default PaginationComponent;
