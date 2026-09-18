import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RequirementForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    tenure: "",
    risk: "",
    security: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field when user starts correcting it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = "Please enter an amount.";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    // Tenure validation
    if (!formData.tenure) {
      newErrors.tenure = "Please enter tenure.";
    } else if (Number(formData.tenure) <= 0) {
      newErrors.tenure = "Tenure must be greater than 0.";
    }

    // Risk validation
    if (!formData.risk) {
      newErrors.risk = "Please select a risk preference.";
    }

    // Security validation
    if (!formData.security.trim()) {
      newErrors.security = "Please enter a security type.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    navigate("/opportunities", {
      state: {
        requirement: formData,
      },
    });
  };

  return (
    <div className="requirement-card">
      <h2>Tell us what you need</h2>

      <p>
        Enter your requirements to discover matching opportunities.
      </p>

      <form onSubmit={handleSubmit} noValidate>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">
            Amount Required
          </label>

          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            aria-invalid={Boolean(errors.amount)}
          />

          {errors.amount && (
            <small className="error">
              {errors.amount}
            </small>
          )}
        </div>

        {/* Tenure */}
        <div className="form-group">
          <label htmlFor="tenure">
            Tenure
          </label>

          <input
            id="tenure"
            type="number"
            name="tenure"
            placeholder="Enter tenure in months"
            value={formData.tenure}
            onChange={handleChange}
            min="1"
            aria-invalid={Boolean(errors.tenure)}
          />

          {errors.tenure && (
            <small className="error">
              {errors.tenure}
            </small>
          )}
        </div>

        {/* Risk */}
        <div className="form-group">
          <label htmlFor="risk">
            Risk Preference
          </label>

          <select
            id="risk"
            name="risk"
            value={formData.risk}
            onChange={handleChange}
            aria-invalid={Boolean(errors.risk)}
          >
            <option value="">
              Select risk preference
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>

          {errors.risk && (
            <small className="error">
              {errors.risk}
            </small>
          )}
        </div>

        {/* Security */}
        <div className="form-group">
          <label htmlFor="security">
            Security Type
          </label>

          <input
            id="security"
            type="text"
            name="security"
            placeholder="e.g. Equity, Mutual Fund"
            value={formData.security}
            onChange={handleChange}
            aria-invalid={Boolean(errors.security)}
          />

          {errors.security && (
            <small className="error">
              {errors.security}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="primary-btn"
        >
          Find Opportunities
        </button>

      </form>
    </div>
  );
}

export default RequirementForm;