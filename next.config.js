/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirects are used to make legitmate/professional looking links to Google Forms for hiring
  async redirects() {
    // Google Forms that need a “name” pre-fill.
    const jobs = [
      {
        source: "/careers/ai-data-engineer",
        form: "https://docs.google.com/forms/d/e/1FAIpQLSd_NEeeyJrdbZK0r4ml8hRdZcJyHa5bXnq--a7uqIJO1ApmIg/viewform",
      },
      // "duplicate" of ai-data-engineer above
      {
        source: "/careers/data-engineer",
        form: "https://docs.google.com/forms/d/e/1FAIpQLSd_NEeeyJrdbZK0r4ml8hRdZcJyHa5bXnq--a7uqIJO1ApmIg/viewform",
      },
      {
        source: "/careers/full-stack",
        form: "https://docs.google.com/forms/d/e/1FAIpQLSdXiOSO0Vk_60z9VrMJRdipF8T7tdmsvKPDFTRwxE5mbN1pWw/viewform",
      },
      {
        source: "/careers/growth-marketer",
        form: "https://docs.google.com/forms/d/e/1FAIpQLSc872Vg-dZI6v4QD7Xy-0U6M5ElPP0kVoVvpP1d1Hj1kO6d3Q/viewform",
      },
    ];

    // Helper to attach the name query when present.
    const withName = ({ source, form }) => ({
      source,
      has: [{ type: "query", key: "name", value: "(?<name>.*)" }],
      destination: `${form}?usp=pp_url&entry.995686107=:name`,
      permanent: false,
    });

    // Fallback when ?name= is missing.
    const withoutName = ({ source, form }) => ({
      source,
      destination: form,
      permanent: false,
    });

    // Generate one “withName” and one “withoutName” rule for every job.
    return jobs.flatMap((job) => [withName(job), withoutName(job)]);
  },
};

module.exports = nextConfig;
