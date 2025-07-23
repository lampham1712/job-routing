import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { LocationOn, Business, AccessTime } from "@mui/icons-material";

export function JobDisplay({
  job,
  variant = "card",
  sections = {
    title: false,
    basicInfo: true,
    description: true,
    requirements: false,
    tags: true,
    postedDate: false,
  },
}) {
  const isCard = variant === "card";

  const getClass = (element) => {
    const prefix = isCard ? "job-card" : "job-modal";
    const classes = {
      infoRow: `${prefix}-info-row`,
      infoRowMb: `${prefix}-info-row-mb-2`,
      icon: `${prefix}-icon`,
      salary: `${prefix}-salary`,
      description: `${prefix}-description`,
      tags: `${prefix}-tags`,
      sectionTitle: "job-modal-section-title",
      skillsSection: "job-modal-skills-section",
      requirementsList: "job-modal-requirements-list",
      requirementsItem: "job-modal-requirements-item",
    };
    return classes[element];
  };

  const getTypography = (type) => {
    if (isCard) {
      return type === "company" ? "body2" : "body2";
    }
    return type === "company" ? "h6" : "body1";
  };

  const getDescription = () => {
    const maxLength = isCard ? 150 : null;
    if (!maxLength || job.description.length <= maxLength) {
      return job.description;
    }
    return job.description.substring(0, maxLength) + "...";
  };

  const renderTags = (showTitle = false) => {
    const maxTags = isCard ? 3 : null;
    const displayTags = maxTags ? job.tags.slice(0, maxTags) : job.tags;
    const hasMoreTags = maxTags && job.tags.length > maxTags;
    const size = isCard ? "small" : "medium";
    const color = isCard ? undefined : "primary";

    return (
      <>
        {showTitle && (
          <Typography variant="h6" className={getClass("skillsSection")}>
            Skills & Tags
          </Typography>
        )}
        <Box className={getClass("tags")}>
          {displayTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size={size}
              variant="outlined"
              color={color}
            />
          ))}
          {hasMoreTags && (
            <Chip
              label={`+${job.tags.length - maxTags} more`}
              size={size}
              variant="outlined"
              color={color}
            />
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      {/* Title */}
      {sections.title && (
        <Typography variant="h6" component="h2" className="job-card-title">
          {job.title}
        </Typography>
      )}

      {/* Basic Info */}
      {sections.basicInfo && (
        <>
          <Box className={getClass("infoRow")}>
            <Business className={getClass("icon")} />
            <Typography variant={getTypography("company")}>
              {job.company}
            </Typography>
          </Box>
          <Box className={getClass("infoRow")}>
            <LocationOn className={getClass("icon")} />
            <Typography variant={getTypography("location")}>
              {job.location}
            </Typography>
          </Box>
          <Box className={getClass("infoRowMb")}>
            <AccessTime className={getClass("icon")} />
            <Typography variant={getTypography("type")}>{job.type}</Typography>
          </Box>
          <Typography
            variant="h6"
            color="primary"
            className={getClass("salary")}
          >
            {job.salary}
          </Typography>
        </>
      )}

      {/* Description */}
      {sections.description && (
        <>
          {!isCard && (
            <Typography variant="h6" className={getClass("sectionTitle")}>
              Job Description
            </Typography>
          )}
          <Typography
            variant={getTypography("description")}
            className={getClass("description")}
          >
            {getDescription()}
          </Typography>
        </>
      )}

      {/* Requirements */}
      {sections.requirements && job.requirements && (
        <>
          <Typography variant="h6" className={getClass("sectionTitle")}>
            Requirements
          </Typography>
          <ul className={getClass("requirementsList")}>
            {job.requirements.map((requirement, index) => (
              <li key={index} className={getClass("requirementsItem")}>
                {requirement}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Tags */}
      {sections.tags && job.tags && renderTags(!isCard)}

      {/* Posted Date */}
      {sections.postedDate && job.postedDate && (
        <Typography variant="body2">
          Posted on: {new Date(job.postedDate).toLocaleDateString()}
        </Typography>
      )}
    </>
  );
}
