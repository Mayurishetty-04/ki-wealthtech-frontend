function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          Fin<span>Scope</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#compare">Compare</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;