import React from "react";
import { Card, CardContent } from "@mui/material";
import { JobDisplay } from "./JobComponents";

export function JobCard({ job, onViewDetails }) {
  return (
    <Card className="job-card" onClick={() => onViewDetails(job)}>
      <CardContent className="job-card-content">
        <JobDisplay
          job={job}
          variant="card"
          sections={{
            title: true,
            basicInfo: true,
            description: true,
            tags: true,
          }}
        />
      </CardContent>
    </Card>
  );
}
