import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

export function JobSearch({ searchQuery, onSearchChange }) {
  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <Box className="job-search-container">
      <TextField
        fullWidth
        placeholder="Search jobs by title, company, location, or skills..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <Clear
                  className="job-search-clear-icon"
                  onClick={handleClearSearch}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
