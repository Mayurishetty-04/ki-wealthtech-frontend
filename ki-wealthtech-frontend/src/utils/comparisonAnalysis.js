export const generateComparisonAnalysis = (
  opportunities,
  requirement
) => {
  if (!opportunities || opportunities.length < 2) {
    return null;
  }

  const amount = Number(requirement?.amount || 0);
  const tenure = Number(requirement?.tenure || 0);
  const risk = requirement?.risk || "Not specified";

  // Lowest interest rate
  const lowestRate = opportunities.reduce((best, current) =>
    current.interestRate < best.interestRate ? current : best
  );

  // Highest maximum amount
  const highestAmount = opportunities.reduce((best, current) =>
    current.maximumAmount > best.maximumAmount ? current : best
  );

  // Longest maximum tenure
  const longestTenure = opportunities.reduce((best, current) =>
    current.tenureMax > best.tenureMax ? current : best
  );

  // Lowest processing fee
  const lowestFee = opportunities.reduce((best, current) =>
    current.processingFee < best.processingFee ? current : best
  );

  // Highest LTV
  const highestLtv = opportunities.reduce((best, current) =>
    current.ltv > best.ltv ? current : best
  );

  // Requirement fit
  const requirementFit = opportunities.map((opportunity) => {
    const amountFits =
      amount >= opportunity.minimumAmount &&
      amount <= opportunity.maximumAmount;

    const tenureFits =
      tenure >= opportunity.tenureMin &&
      tenure <= opportunity.tenureMax;

    return {
      opportunity,
      amountFits,
      tenureFits,
      fullyFits: amountFits && tenureFits,
    };
  });

  const fullyMatching = requirementFit.filter(
    (item) => item.fullyFits
  );

  // Risk matching
  const riskMatches = opportunities.filter((opportunity) =>
    opportunity.riskProfile
      ?.toLowerCase()
      .includes(risk.toLowerCase())
  );

  return {
    requirement: {
      amount,
      tenure,
      risk,
    },

    requirementFit,

    summary: {
      fullyMatchingCount: fullyMatching.length,
      totalCount: opportunities.length,
    },

    highlights: {
      lowestRate,
      highestAmount,
      longestTenure,
      lowestFee,
      highestLtv,
      riskMatches,
    },
  };
};