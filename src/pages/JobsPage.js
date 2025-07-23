import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Alert } from "@mui/material";
import { JobService } from "../services/jobService";
import { JobCard } from "../components/JobCard";
import { JobDetailModal } from "../components/JobDetailModal";
import { LoginModal } from "../components/LoginModal";
import { JobSearch } from "../components/JobSearch";
import { JobPagination } from "../components/JobPagination";
import { useAuth } from "../auth/AuthContext";

const JOBS_PER_PAGE = 5;

export function JobsPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  const filteredJobs = JobService.searchJobs(searchQuery);

  // Calculate pagination
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleJobClick = (job) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedJob(job);
  };

  const handleCloseJobModal = () => {
    setSelectedJob(null);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" className="jobs-page-title">
        Job Opportunities
      </Typography>

      <Typography variant="body1" className="jobs-page-subtitle">
        Discover your next career opportunity.{" "}
        {!user && "Sign in to view job details."}
      </Typography>

      <JobSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {filteredJobs.length === 0 ? (
        <Alert severity="info" className="jobs-page-alert">
          No jobs found matching your search criteria. Try adjusting your search
          terms.
        </Alert>
      ) : (
        <>
          <Typography variant="body2" className="jobs-page-count">
            {totalJobs} jobs found
          </Typography>

          <Grid container spacing={3}>
            {currentJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <JobCard job={job} onViewDetails={handleJobClick} />
              </Grid>
            ))}
          </Grid>

          <JobPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalJobs={totalJobs}
            jobsPerPage={JOBS_PER_PAGE}
          />
        </>
      )}

      <JobDetailModal
        job={selectedJob}
        open={!!selectedJob}
        onClose={handleCloseJobModal}
      />

      <LoginModal
        open={showLoginModal}
        onClose={handleCloseLoginModal}
        onSuccess={handleLoginSuccess}
      />
    </Box>
  );
}
