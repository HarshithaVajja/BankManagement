import React, { useState } from "react";
import "../styles/landing.css";
import Login from "../components/Login";
import Register from "../components/Register";

const Landing = () => {
  const [isLoginBox, setIsLoginBox] = useState(true);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <span className="brand">NeoBank</span>
        </div>
        <div className="nav-right">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#join" className="btn-outline">Join Now</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <h1>Welcome to Your Trusted Bank</h1>
        <p>
          Secure. Convenient. Innovative. Experience modern banking with personalized services, 24/7 support, and total peace of mind.
        </p>
        <div className="cta">
          <a href="#join" className="btn-primary">Open Account</a>
          <a href="#features" className="btn-secondary">View Services</a>
        </div>
      </section>

      {/* Auth Section (below hero) */}
      <section className="auth-section" id="join">
        <div className="auth-card">
          {isLoginBox ? (
            <Login setIsLoginBox={setIsLoginBox} />
          ) : (
            <Register setIsLoginBox={setIsLoginBox} />
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="feature-card">
          <span className="icon">💳</span>
          <h3>Instant Payments</h3>
          <p>Send and receive money globally in seconds.</p>
        </div>
        <div className="feature-card">
          <span className="icon">🔒</span>
          <h3>Top Security</h3>
          <p>Bank-grade encryption keeps your data safe.</p>
        </div>
        <div className="feature-card">
          <span className="icon">📊</span>
          <h3>Smart Insights</h3>
          <p>Track spending, savings, and investments easily.</p>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <h2>Why NeoBank?</h2>
        <p>
          We’re redefining banking for the modern world.
          No paperwork, no waiting lines — just simple, powerful finance
          in your pocket.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 NeoBank. All Rights Reserved.</p>
        <div className="socials">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
