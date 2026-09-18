export const checkEligibility = (
  opportunity,
  requirement
) => {
  const amount = Number(requirement.amount);
  const tenure = Number(requirement.tenure);

  if (amount < opportunity.minimumAmount) {
    return {
      status: "Not Eligible",
      reason: `Requested amount is below the minimum amount of ₹${opportunity.minimumAmount.toLocaleString()}.`,
      nextAction:
        "Try a higher amount or another opportunity.",
    };
  }

  if (amount > opportunity.maximumAmount) {
    return {
      status: "Not Eligible",
      reason: `Requested amount exceeds the maximum amount of ₹${opportunity.maximumAmount.toLocaleString()}.`,
      nextAction:
        "Try a lower amount or another opportunity.",
    };
  }

  if (
    tenure < opportunity.tenureMin ||
    tenure > opportunity.tenureMax
  ) {
    return {
      status: "Not Eligible",
      reason: `Requested tenure must be between ${opportunity.tenureMin} and ${opportunity.tenureMax} months.`,
      nextAction:
        "Change the tenure and check again.",
    };
  }

  const requestedRisk =
    requirement.risk?.toLowerCase();

  const opportunityRisk =
    opportunity.riskProfile?.toLowerCase();

  if (
    requestedRisk &&
    !opportunityRisk.includes(requestedRisk)
  ) {
    return {
      status: "Conditional",
      reason:
        "The opportunity's risk profile differs from your selected risk preference.",
      nextAction:
        "Review the risk profile before proceeding.",
    };
  }

  return {
    status: "Eligible",
    reason:
      "Your requested amount, tenure and risk preference match this opportunity.",
    nextAction:
      "Proceed to the next step.",
  };
};