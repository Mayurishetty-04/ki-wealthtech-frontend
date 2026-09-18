import RequirementForm from "../components/RequirementForm";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WEALTHTECH OPPORTUNITY DISCOVERY</p>

          <h1>
            Find the right financial
            <span> opportunity for you.</span>
          </h1>

          <p className="hero-description">
            Tell us what you need and explore opportunities that match
            your requirements.
          </p>
        </div>

        <RequirementForm />
      </section>
    </main>
  );
}

export default Home;