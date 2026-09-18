import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getOpportunityById } from "../services/opportunityService";
import { checkEligibility } from "../utils/eligibility";

function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Requirement submitted by the user
  const requirement =
    location.state?.requirement ||
    location.state?.requirements;

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOpportunity();
  }, [id]);

  const loadOpportunity = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOpportunityById(id);

      setOpportunity(data);
    } catch (err) {
      setError("Opportunity not found.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading) {
    return (
      <main className="details-page">
        <div className="state-card">
          <h2>Loading opportunity...</h2>
          <p>Please wait.</p>
        </div>
      </main>
    );
  }

  // =========================================
  // ERROR STATE
  // =========================================

  if (error) {
    return (
      <main className="details-page">
        <div className="state-card error-state">

          <h2>Opportunity not found</h2>

          <p>{error}</p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/opportunities")
            }
          >
            Back to Opportunities
          </button>

        </div>
      </main>
    );
  }

  // =========================================
  // ELIGIBILITY CALCULATION
  // =========================================

  const eligibility = requirement
    ? checkEligibility(
        opportunity,
        requirement
      )
    : null;

  return (
    <main className="details-page">
      <div className="page-container">

        {/* =====================================
            BACK BUTTON
        ===================================== */}

        <button
          className="back-btn"
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

        <section className="details-card">

          {/* =====================================
              HEADER
          ===================================== */}

          <div className="details-header">

            <div>
              <span className="product-label">
                {opportunity.product}
              </span>

              <h1>
                {opportunity.provider}
              </h1>

              <p>
                Opportunity ID: {opportunity.id}
              </p>
            </div>

            <span className="risk-badge">
              {opportunity.riskProfile}
            </span>

          </div>

          {/* =====================================
              INTEREST RATE
          ===================================== */}

          <div className="details-rate">

            <span>Interest Rate</span>

            <strong>
              {opportunity.interestRate}%
            </strong>

          </div>

          {/* =====================================
              OPPORTUNITY DETAILS
          ===================================== */}

          <div className="details-grid">

            <div className="detail-item">
              <span>Minimum Amount</span>

              <strong>
                ₹
                {opportunity.minimumAmount.toLocaleString()}
              </strong>
            </div>

            <div className="detail-item">
              <span>Maximum Amount</span>

              <strong>
                ₹
                {opportunity.maximumAmount.toLocaleString()}
              </strong>
            </div>

            <div className="detail-item">
              <span>Minimum Tenure</span>

              <strong>
                {opportunity.tenureMin} months
              </strong>
            </div>

            <div className="detail-item">
              <span>Maximum Tenure</span>

              <strong>
                {opportunity.tenureMax} months
              </strong>
            </div>

            <div className="detail-item">
              <span>Loan to Value</span>

              <strong>
                {opportunity.ltv}%
              </strong>
            </div>

            <div className="detail-item">
              <span>Processing Fee</span>

              <strong>
                {opportunity.processingFee}%
              </strong>
            </div>

          </div>

          {/* =====================================
              ELIGIBILITY RESULT
          ===================================== */}

          {eligibility && (
            <div
              className={`eligibility-box ${eligibility.status
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >

              <h2>
                {eligibility.status}
              </h2>

              <p>
                {eligibility.reason}
              </p>

              <strong>
                Next action:{" "}
                {eligibility.nextAction}
              </strong>

            </div>
          )}

          {/* =====================================
              ACTION SECTION
          ===================================== */}

          <div className="details-action">

            <h2>
              {eligibility
                ? "Ready to continue?"
                : "Interested in this opportunity?"}
            </h2>

            <p>
              {eligibility
                ? "Review the eligibility result above and continue exploring opportunities."
                : "Check whether this opportunity matches your requirements."}
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

        </section>

      </div>
    </main>
  );
}

export default OpportunityDetails;