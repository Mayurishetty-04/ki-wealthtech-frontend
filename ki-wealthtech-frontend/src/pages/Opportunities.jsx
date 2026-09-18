import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getOpportunities,
} from "../services/opportunityService";

import OpportunityCard from "../components/OpportunityCard";

function Opportunities() {
  const location = useLocation();
  const navigate = useNavigate();

  const requirements =
    location.state?.requirements ||
    location.state?.requirement;

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [selectedOpportunities, setSelectedOpportunities] =
    useState([]);

  const [compareMessage, setCompareMessage] = useState("");

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOpportunities();

      setOpportunities(response.items || []);
    } catch (err) {
      setError(
        "Unable to load opportunities. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (opportunity) => {
    setSelectedOpportunities((prev) => {
      const alreadySelected = prev.some(
        (item) => item.id === opportunity.id
      );

      if (alreadySelected) {
        return prev.filter(
          (item) => item.id !== opportunity.id
        );
      }

      if (prev.length >= 3) {
        setCompareMessage(
          "You can compare up to 3 opportunities at a time."
        );

        setTimeout(() => {
          setCompareMessage("");
        }, 3000);

        return prev;
      }

      return [...prev, opportunity];
    });
  };

  const filteredOpportunities = opportunities
    .filter((opportunity) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        opportunity.provider
          ?.toLowerCase()
          .includes(searchValue) ||
        opportunity.product
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRisk =
        !risk ||
        opportunity.riskProfile
          ?.toLowerCase()
          .includes(risk.toLowerCase());

      const matchesAmount =
        !requirements?.amount ||
        (Number(requirements.amount) >=
          opportunity.minimumAmount &&
          Number(requirements.amount) <=
            opportunity.maximumAmount);

      const matchesTenure =
        !requirements?.tenure ||
        (Number(requirements.tenure) >=
          opportunity.tenureMin &&
          Number(requirements.tenure) <=
            opportunity.tenureMax);

      return (
        matchesSearch &&
        matchesRisk &&
        matchesAmount &&
        matchesTenure
      );
    })
    .sort((a, b) => {
      if (sortBy === "rate-low") {
        return a.interestRate - b.interestRate;
      }

      if (sortBy === "rate-high") {
        return b.interestRate - a.interestRate;
      }

      if (sortBy === "amount-high") {
        return b.maximumAmount - a.maximumAmount;
      }

      return 0;
    });

  if (loading) {
    return (
      <main className="opportunities-page">
        <div
          className="page-container"
          role="status"
          aria-live="polite"
        >
          <p>Loading opportunities...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="opportunities-page">
        <div className="page-container">
          <div className="error-state" role="alert">
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button
              className="primary-btn"
              onClick={loadOpportunities}
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="opportunities-page">
      <div className="page-container">

        {/* Page Heading */}
        <div className="page-heading">
          <span>OPPORTUNITIES</span>

          <h1>Explore Opportunities</h1>

          <p>
            Discover opportunities that match your
            requirements.
          </p>
        </div>

        {/* Filters */}
        <div className="filters">

          <input
            type="search"
            placeholder="Search provider or product"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            aria-label="Search provider or product"
          />

          <select
            value={risk}
            onChange={(e) =>
              setRisk(e.target.value)
            }
            aria-label="Filter by risk profile"
          >
            <option value="">
              All Risk Profiles
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Moderate">
              Moderate
            </option>

            <option value="High">
              High
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            aria-label="Sort opportunities"
          >
            <option value="">
              Sort By
            </option>

            <option value="rate-low">
              Interest Rate: Low to High
            </option>

            <option value="rate-high">
              Interest Rate: High to Low
            </option>

            <option value="amount-high">
              Maximum Amount: High to Low
            </option>
          </select>

        </div>

        {/* Compare message */}
        {compareMessage && (
          <div
            className="compare-message"
            role="status"
            aria-live="polite"
          >
            {compareMessage}
          </div>
        )}

        {/* Empty State */}
        {filteredOpportunities.length === 0 ? (
          <div className="empty-state">
            <h2>No matching opportunities</h2>

            <p>
              Try changing your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="opportunity-grid">

            {filteredOpportunities.map(
              (opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isSelected={selectedOpportunities.some(
                    (item) =>
                      item.id === opportunity.id
                  )}
                  onCompare={handleCompare}
                  onViewDetails={() =>
                    navigate(
                      `/opportunities/${opportunity.id}`,
                      {
                        state: {
                          requirements,
                        },
                      }
                    )
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      {/* Compare Bar */}
      {selectedOpportunities.length > 0 && (
        <div
          className="compare-bar"
          role="region"
          aria-label="Opportunity comparison"
        >
          <div>
            <strong>
              {selectedOpportunities.length}
            </strong>

            <span>
              {" "}
              opportunit
              {selectedOpportunities.length === 1
                ? "y"
                : "ies"}{" "}
              selected
            </span>
          </div>

          <button
            className="primary-btn"
            disabled={
              selectedOpportunities.length < 2
            }
            onClick={() =>
              navigate("/compare", {
                state: {
                  opportunities:
                    selectedOpportunities,
                  requirements,
                },
              })
            }
          >
            Compare Selected
          </button>
        </div>
      )}
    </main>
  );
}

export default Opportunities;