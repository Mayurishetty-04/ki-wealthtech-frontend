import { opportunities } from "../data/opportunities";

export const getOpportunities = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: opportunities,
        total: opportunities.length,
        page: 1,
        limit: opportunities.length,
      });
    }, 700);
  });
};

export const getOpportunityById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const opportunity = opportunities.find(
        (item) => item.id === id
      );

      if (!opportunity) {
        reject(new Error("Opportunity not found"));
        return;
      }

      resolve(opportunity);
    }, 500);
  });
};