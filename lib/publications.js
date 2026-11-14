import generated from "@/lib/publications.generated.json";

// The line under the page title, from the counts in the generated file
export const publicationsSummary = (byline = "") => {
  const { peerReviewed, datasets, firstAuthor, seniorAuthor, q1Journals } =
    generated.stats;
  const works = `Selected from ${peerReviewed} peer-reviewed publications and ${datasets} open datasets`;
  const counts = `first author on ${firstAuthor}, senior author on ${seniorAuthor}, ${q1Journals} in Q1 journals`;
  return `${works}${byline && ` ${byline}`}: ${counts}`;
};
