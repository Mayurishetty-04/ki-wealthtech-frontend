import { useLocation, useNavigate } from "react-router-dom";
import { generateComparisonAnalysis } from "../utils/comparisonAnalysis";
function Compare() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedOpportunities =
    location.state?.opportunities || [];

  const requirement =
    location.state?.requirement ||
    location.state?.requirements;

    const analysis = generateComparisonAnalysis(
  selectedOpportunities,
  requirement
);

  // =========================================
  // LESS THAN 2 OPPORTUNITIES
  // =========================================

  if (selectedOpportunities.length < 2) {
    return (
      <main className="compare-page">
        <div className="page-container">

          <div className="state-card">

            <h1>
              Compare Opportunities
            </h1>

            <p>
              Please select at least 2
              opportunities to compare.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/opportunities", {
                  state: {
                    requirement,
                  },
                })
              }
            >
              Back to Opportunities
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="compare-page">
      <div className="page-container">

        {/* =====================================
            BACK BUTTON
        ===================================== */}

        <div className="details-back">

          <button
            onClick={() =>
              navigate("/opportunities", {
                state: {
                  requirement,
                },
              })
            }
          >
            ← Back to Opportunities
          </button>

        </div>

        {/* =====================================
            PAGE HEADING
        ===================================== */}

        <div className="page-heading">

          <span className="eyebrow">
            COMPARISON
          </span>

          <h1>
            Compare Opportunities
          </h1>

          <p>
            Compare the selected opportunities
            side by side.
          </p>

        </div>

        {/* =====================================
            COMPARISON CARDS
        ===================================== */}

        <div className="comparison-grid">

          {selectedOpportunities.map(
            (opportunity) => (
              <div
                className="comparison-card"
                key={opportunity.id}
              >

                <span className="product-label">
                  {opportunity.product}
                </span>

                <h2>
                  {opportunity.provider}
                </h2>

                <span className="risk-badge">
                  {opportunity.riskProfile}
                </span>

                {/* Interest Rate */}

                <div className="comparison-item">

                  <span>
                    Interest Rate
                  </span>

                  <strong>
                    {opportunity.interestRate}%
                  </strong>

                </div>

                {/* Amount Range */}

                <div className="comparison-item">

                  <span>
                    Amount Range
                  </span>

                  <strong>
                    ₹
                    {opportunity.minimumAmount.toLocaleString()}
                    {" – "}
                    ₹
                    {opportunity.maximumAmount.toLocaleString()}
                  </strong>

                </div>

                {/* Tenure */}

                <div className="comparison-item">

                  <span>
                    Tenure
                  </span>

                  <strong>
                    {opportunity.tenureMin}
                    {" – "}
                    {opportunity.tenureMax}
                    {" months"}
                  </strong>

                </div>

                {/* LTV */}

                <div className="comparison-item">

                  <span>
                    LTV
                  </span>

                  <strong>
                    {opportunity.ltv}%
                  </strong>

                </div>

                {/* Processing Fee */}

                <div className="comparison-item">

                  <span>
                    Processing Fee
                  </span>

                  <strong>
                    {opportunity.processingFee}%
                  </strong>

                </div>

                {/* View Details */}

                <button
                  className="primary-btn"
                  onClick={() =>
                    navigate(
                      `/opportunities/${opportunity.id}`,
                      {
                        state: {
                          requirement,
                        },
                      }
                    )
                  }
                >
                  View Details
                </button>

              </div>
            )
          )}

        </div>

              {/* Smart Comparison Analysis */}
      {analysis && (
        <section className="smart-analysis">
          <div className="smart-analysis-header">
            <span className="analysis-label">
              SMART ANALYSIS
            </span>

            <h2>🤖 Smart Comparison Analysis</h2>

            <p>
              A detailed comparison based on your requirements
              and the selected opportunities.
            </p>
          </div>

          {/* Requirement Summary */}
          <div className="analysis-section">
            <h3>Your Requirement</h3>

            <div className="requirement-summary">
              <div>
                <span>Amount</span>
                <strong>
                  ₹{analysis.requirement.amount.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Tenure</span>
                <strong>
                  {analysis.requirement.tenure} months
                </strong>
              </div>

              <div>
                <span>Risk Preference</span>
                <strong>
                  {analysis.requirement.risk}
                </strong>
              </div>
            </div>

            <p className="analysis-text">
              Your requirement is for ₹
              {analysis.requirement.amount.toLocaleString()} for a
              tenure of {analysis.requirement.tenure} months with a{" "}
              {analysis.requirement.risk.toLowerCase()} risk preference.
              The following analysis explains how the selected
              opportunities differ across the key parameters.
            </p>
          </div>

          {/* Requirement Fit */}
          <div className="analysis-section">
            <h3>Requirement Fit</h3>

            {analysis.requirementFit.map((item) => (
              <div
                className="fit-item"
                key={item.opportunity.id}
              >
                <div className="fit-title">
                  <strong>
                    {item.opportunity.provider}
                  </strong>

                  <span
                    className={
                      item.fullyFits
                        ? "fit-status fit"
                        : "fit-status partial"
                    }
                  >
                    {item.fullyFits
                      ? "Fits Requirement"
                      : "Partial Fit"}
                  </span>
                </div>

                <p>
                  {item.opportunity.provider} supports an amount
                  between ₹
                  {item.opportunity.minimumAmount.toLocaleString()} and
                  ₹
                  {item.opportunity.maximumAmount.toLocaleString()} and
                  a tenure between {item.opportunity.tenureMin} and{" "}
                  {item.opportunity.tenureMax} months.
                  {" "}

                  {item.amountFits && item.tenureFits
                    ? "Your requested amount and tenure fall within these ranges."
                    : !item.amountFits && !item.tenureFits
                    ? "Your requested amount and tenure both fall outside these ranges."
                    : !item.amountFits
                    ? "Your requested amount falls outside the supported amount range."
                    : "Your requested tenure falls outside the supported tenure range."}
                </p>
              </div>
            ))}
          </div>

          {/* Interest Rate */}
          <div className="analysis-section">
            <h3>Interest Rate Analysis</h3>

            <p className="analysis-text">
              Among the selected opportunities,{" "}
              <strong>
                {analysis.highlights.lowestRate.provider}
              </strong>{" "}
              has the lowest stated interest rate at{" "}
              <strong>
                {analysis.highlights.lowestRate.interestRate}%
              </strong>
              . A lower stated rate can reduce the interest cost
              over the same principal and tenure, although the actual
              cost may depend on other terms and charges.
            </p>

            <div className="highlight-box">
              <strong>
                Lowest stated rate:{" "}
                {analysis.highlights.lowestRate.provider}
              </strong>

              <span>
                {analysis.highlights.lowestRate.interestRate}%
              </span>
            </div>
          </div>

          {/* Amount Analysis */}
          <div className="analysis-section">
            <h3>Amount Range Analysis</h3>

            <p className="analysis-text">
              <strong>
                {analysis.highlights.highestAmount.provider}
              </strong>{" "}
              supports the highest maximum amount among the selected
              opportunities, up to ₹
              {analysis.highlights.highestAmount.maximumAmount.toLocaleString()}.
              This provides greater flexibility if your funding
              requirement increases within the supported range.
            </p>

            <div className="highlight-box">
              <strong>
                Highest maximum amount:{" "}
                {analysis.highlights.highestAmount.provider}
              </strong>

              <span>
                ₹
                {analysis.highlights.highestAmount.maximumAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Tenure Analysis */}
          <div className="analysis-section">
            <h3>Tenure Analysis</h3>

            <p className="analysis-text">
              <strong>
                {analysis.highlights.longestTenure.provider}
              </strong>{" "}
              offers the longest maximum tenure at{" "}
              <strong>
                {analysis.highlights.longestTenure.tenureMax} months
              </strong>
              . A longer available tenure may provide additional
              flexibility when selecting the repayment period, while
              the overall cost can vary with the chosen tenure.
            </p>

            <div className="highlight-box">
              <strong>
                Longest available tenure:{" "}
                {analysis.highlights.longestTenure.provider}
              </strong>

              <span>
                {analysis.highlights.longestTenure.tenureMax} months
              </span>
            </div>
          </div>

          {/* LTV & Fee */}
          <div className="analysis-section">
            <h3>LTV & Processing Fee</h3>

            <p className="analysis-text">
              <strong>
                {analysis.highlights.highestLtv.provider}
              </strong>{" "}
              has the highest stated LTV at{" "}
              <strong>
                {analysis.highlights.highestLtv.ltv}%
              </strong>
              . Meanwhile,{" "}
              <strong>
                {analysis.highlights.lowestFee.provider}
              </strong>{" "}
              has the lowest processing fee at{" "}
              <strong>
                {analysis.highlights.lowestFee.processingFee}%
              </strong>
              .
            </p>

            <div className="analysis-two-column">
              <div className="highlight-box">
                <span>Highest LTV</span>
                <strong>
                  {analysis.highlights.highestLtv.provider}
                </strong>
                <strong>
                  {analysis.highlights.highestLtv.ltv}%
                </strong>
              </div>

              <div className="highlight-box">
                <span>Lowest Processing Fee</span>
                <strong>
                  {analysis.highlights.lowestFee.provider}
                </strong>
                <strong>
                  {analysis.highlights.lowestFee.processingFee}%
                </strong>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="analysis-section">
            <h3>Risk Profile Analysis</h3>

            <p className="analysis-text">
              Your selected risk preference is{" "}
              <strong>{analysis.requirement.risk}</strong>.
              The selected opportunities have different stated risk
              profiles, so this factor should be reviewed alongside
              the financial parameters and eligibility result.
            </p>

            <div className="risk-analysis-list">
              {selectedOpportunities.map((opportunity) => (
                <div
                  className="risk-analysis-item"
                  key={opportunity.id}
                >
                  <strong>
                    {opportunity.provider}
                  </strong>

                  <span>
                    Stated risk profile:{" "}
                    {opportunity.riskProfile}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Analysis */}
          <div className="analysis-conclusion">
            <span>💡 KEY TAKEAWAY</span>

            <h3>Overall Comparison</h3>

            <p>
              The selected opportunities have different strengths
              across interest rate, amount range, tenure, LTV and
              processing fee.{" "}
              <strong>
                {analysis.highlights.lowestRate.provider}
              </strong>{" "}
              has the lowest stated interest rate,{" "}
              <strong>
                {analysis.highlights.highestAmount.provider}
              </strong>{" "}
              supports the highest maximum amount, and{" "}
              <strong>
                {analysis.highlights.longestTenure.provider}
              </strong>{" "}
              provides the longest available tenure.
            </p>

            <p>
              Rather than relying on a single parameter, the
              comparison should be considered together with your
              requested amount, tenure, risk preference and the
              eligibility result for each opportunity.
            </p>
          </div>
        </section>
      )}

      </div>
    </main>
  );
}

export default Compare;