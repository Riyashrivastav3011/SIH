import React from "react";
import InternshipCard from "./Internshipcards";
import "./internship.css"

const Internships = () => {
  return (
    <div className="internships-page">
      <section className="internships-header">
        <h1>
          Find Your Perfect <span>Internship</span>
        </h1>
        <p>
          Discover internships that match your skills, career goals and interests.
          Let SkillBridge help you move from learning to real-world experience.
        </p>
      </section>

      <div className="search-area">
        <div className="search-box">
          <input type="text" placeholder="Search internship or company..." />
          <select>
            <option value="all">All Categories</option>
            <option value="development">Development</option>
            <option value="data">Data & Analytics</option>
            <option value="ai">AI & ML</option>
            <option value="design">Design</option>
          </select>
          <button>Search</button>
        </div>
      </div>

      <section className="internship-container">
        <div className="internship-grid">
          <InternshipCard />
        </div>
      </section>
    </div>
  );
};

export default Internships;