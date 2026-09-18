function OpportunityCard({
  opportunity,
  onViewDetails,
  onCompare,
  isSelected,
}) {
  return (
    <div className="opportunity-card">
      <div className="card-top">
        <span className="product-label">
          {opportunity.product}
        </span>

        <span className="risk-badge">
          {opportunity.riskProfile}
        </span>
      </div>

      <h2>{opportunity.provider}</h2>

      <div className="interest-rate">
        {opportunity.interestRate}%
        <span>Interest Rate</span>
      </div>

      <div className="card-details">
        <div>
          <span>Amount</span>
          <strong>
            ₹{opportunity.minimumAmount.toLocaleString()} – ₹
            {opportunity.maximumAmount.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Tenure</span>
          <strong>
            {opportunity.tenureMin} – {opportunity.tenureMax} months
          </strong>
        </div>

        <div>
          <span>LTV</span>
          <strong>{opportunity.ltv}%</strong>
        </div>

        <div>
          <span>Processing Fee</span>
          <strong>{opportunity.processingFee}%</strong>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="secondary-btn"
          onClick={() => onViewDetails(opportunity.id)}
        >
          View Details
        </button>

        <button
          className={isSelected ? "selected-btn" : "primary-btn"}
          onClick={() => onCompare(opportunity)}
        >
          {isSelected ? "Added to Compare" : "Compare"}
        </button>
      </div>
    </div>
  );
}

export default OpportunityCard;