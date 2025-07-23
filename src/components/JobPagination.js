import React from "react";
import { Box, Pagination, Typography } from "@mui/material";

export function JobPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalJobs,
  jobsPerPage,
}) {
  if (totalPages <= 1) return null;

  const startJob = (currentPage - 1) * jobsPerPage + 1;
  const endJob = Math.min(currentPage * jobsPerPage, totalJobs);

  return (
    <Box className="job-pagination-container">
      <Typography variant="body2">
        Showing {startJob}-{endJob} of {totalJobs} jobs
      </Typography>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
