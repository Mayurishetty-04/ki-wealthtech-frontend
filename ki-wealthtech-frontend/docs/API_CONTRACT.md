# API Contract
Candidates may mock these endpoints using the supplied CSV.

GET /api/opportunities
Query: amount, tenure, risk, search, sort, page, limit
Returns: {items: [...], total, page, limit}

GET /api/opportunities/{id}
Returns one opportunity.

POST /api/eligibility/check
Request: {opportunity_id, amount, tenure, risk, security_type}
Returns: {status: "eligible|conditional|not_eligible", reasons: [], max_supported_amount}

POST /api/compare
Request: {opportunity_ids: ["OPP-1001","OPP-1004"]}
Returns comparison-ready opportunity data.
