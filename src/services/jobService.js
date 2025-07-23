import jobsData from "../jobs.json";

export class JobService {
  static getAllJobs() {
    return jobsData;
  }

  static getJobById(id) {
    return jobsData.find((job) => job.id === parseInt(id));
  }

  static searchJobs(query) {
    if (!query.trim()) {
      return jobsData;
    }

    const lowercaseQuery = query.toLowerCase();
    return jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(lowercaseQuery) ||
        job.company.toLowerCase().includes(lowercaseQuery) ||
        job.location.toLowerCase().includes(lowercaseQuery) ||
        job.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        job.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}
