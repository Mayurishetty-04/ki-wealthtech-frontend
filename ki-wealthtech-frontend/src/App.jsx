import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import Compare from "./pages/Compare";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/opportunities"
          element={<Opportunities />}
        />

        <Route
          path="/opportunities/:id"
          element={<OpportunityDetails />}
        />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </>
  );
}

export default App;