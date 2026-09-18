import { describe, expect, it } from "vitest";
import { checkEligibility } from "./eligibility";

const opportunity = {
  minimumAmount: 200000,
  maximumAmount: 5000000,
  tenureMin: 12,
  tenureMax: 36,
  riskProfile: "Moderate",
};

describe("checkEligibility", () => {
  it("returns Eligible when requirements match", () => {
    const requirement = {
      amount: "500000",
      tenure: "24",
      risk: "Moderate",
    };

    const result = checkEligibility(
      opportunity,
      requirement
    );

    expect(result.status).toBe("Eligible");
  });

  it("returns Not Eligible when amount exceeds maximum", () => {
    const requirement = {
      amount: "6000000",
      tenure: "24",
      risk: "Medium",
    };

    const result = checkEligibility(
      opportunity,
      requirement
    );

    expect(result.status).toBe("Not Eligible");
    expect(result.reason).toContain(
      "exceeds the maximum amount"
    );
  });

  it("returns Not Eligible when tenure is outside the allowed range", () => {
    const requirement = {
      amount: "500000",
      tenure: "48",
      risk: "Medium",
    };

    const result = checkEligibility(
      opportunity,
      requirement
    );

    expect(result.status).toBe("Not Eligible");
  });
});