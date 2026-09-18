# FinScope — WealthTech Opportunity Discovery Platform

A responsive WealthTech frontend application built for the K&I Wealth Tech Frontend Development Assessment.

FinScope helps users discover, explore, compare, and evaluate financial opportunities based on their requirements.

---

## 🚀 Project Overview

FinScope provides a complete opportunity discovery journey:

1. Enter financial requirements
2. Discover matching opportunities
3. Search, filter, and sort opportunities
4. View opportunity details
5. Check eligibility
6. Select 2–3 opportunities for comparison
7. Compare opportunities side by side
8. Get a detailed Smart Comparison Analysis

The application uses fictional opportunity data and a mocked asynchronous API service.

---

## ✨ Key Features

### Requirement Discovery

Users can enter:

- Amount required
- Tenure in months
- Risk preference
- Security type

Client-side validation is provided for required fields and invalid values.

### Opportunity Discovery

Users can:

- Search by provider or product
- Filter by risk profile
- Sort by interest rate
- Sort by maximum amount
- View matching opportunities
- Handle empty results

### Opportunity Details

Each opportunity provides:

- Provider
- Product
- Interest rate
- Amount range
- Tenure range
- LTV
- Processing fee
- Risk profile
- Eligibility result

### Eligibility Checking

The application evaluates:

- Requested amount
- Supported amount range
- Requested tenure
- Supported tenure range
- Risk preference

Possible results:

- Eligible
- Conditional
- Not Eligible

Each result includes a reason and suggested next action.

### Opportunity Comparison

Users can select up to 3 opportunities and compare:

- Interest rate
- Amount range
- Tenure
- LTV
- Processing fee
- Risk profile

### Smart Comparison Analysis

In addition to the manual comparison, FinScope generates a detailed data-driven analysis covering:

- Requirement fit
- Interest rate differences
- Amount range differences
- Tenure flexibility
- LTV
- Processing fee
- Risk profile
- Overall comparison reasoning

The analysis is generated dynamically from the selected opportunities and user requirements.

### UX and Accessibility

The application includes:

- Responsive desktop, tablet, and mobile layouts
- Keyboard focus states
- Semantic labels
- Accessible validation messages
- ARIA attributes
- Loading states
- Error states
- Retry handling
- Empty states
- Comparison-limit feedback

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tooling |
| JavaScript (ES6+) | Application logic |
| React Router | Client-side routing |
| CSS3 | Responsive styling |
| Vitest | Testing |
| React Testing Library | UI testing utilities |
| Git / GitHub | Version control |

---

# 📁 Project Architecture

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── OpportunityCard.jsx
│   └── RequirementForm.jsx
│
├── data/
│   └── opportunities.js
│
├── pages/
│   ├── Home.jsx
│   ├── Opportunities.jsx
│   ├── OpportunityDetails.jsx
│   └── Compare.jsx
│
├── services/
│   └── opportunityService.js
│
├── utils/
│   ├── eligibility.js
│   ├── eligibility.test.js
│   └── comparisonAnalysis.js
│
├── test/
│   └── setup.js
│
├── App.jsx
├── main.jsx
└── index.css
```

# 🧪 Live Demo

## Run the Application

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Example Requirement Values

Use these sample values to explore the application:

- **Amount Required:** ₹5,00,000
- **Tenure:** 24 months
- **Risk Preference:** Medium
- **Security Type:** Equity

Click **Find Opportunities**.

## Demo Flow

1. Explore the available opportunities.
2. Use **Search**, **Filter**, or **Sort** to refine the results.
3. Click **View Details** to view opportunity information and eligibility.
4. Select **2 or 3 opportunities**.
5. Click **Compare Selected**.
6. Review the side-by-side comparison.
7. Scroll down to view the **Smart Comparison Analysis**.

## Additional Testing

The following scenarios can also be tested:

- Submit the requirement form with empty or invalid fields.
- Enter an amount outside an opportunity's supported range.
- Enter a tenure outside the supported range.
- Search for a provider/product that does not exist to view the empty state.
- Select 3 opportunities and attempt to select a 4th to test the comparison limit.