import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { JobDisplay } from "./JobComponents";

export function JobDetailModal({ job, open, onClose }) {
  if (!job) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
      <DialogTitle>
        <Box className="job-modal-header">
          <Typography variant="h5" component="h2">
            {job.title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box className="job-modal-content-section">
          <JobDisplay
            job={job}
            variant="modal"
            sections={{
              basicInfo: true,
              description: true,
              requirements: true,
              tags: true,
              postedDate: true,
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
