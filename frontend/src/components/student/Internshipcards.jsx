import React from "react";
import "./internship.css";

const internships = [
  {
    icon: "📊",
    match: 92,
    title: "Web Development Intern",
    company: "TechNova Solutions",
    location: "Remote",
    duration: "3 Months",
    type: "Paid",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    icon: "💻",
    match: 88,
    title: "Data Analyst Intern",
    company: "DataCore Analytics",
    location: "Hybrid",
    duration: "6 Months",
    type: "Paid",
    skills: ["Python", "SQL", "Excel", "Power BI"],
  },
  {
    icon: "🤖",
    match: 84,
    title: "AI / ML Intern",
    company: "FutureAI Labs",
    location: "On-site",
    duration: "4 Months",
    type: "Paid",
    skills: ["Python", "Machine Learning", "NLP"],
  },
  {
    icon: "🎨",
    match: 79,
    title: "UI/UX Design Intern",
    company: "Creative Pixel Studio",
    location: "Remote",
    duration: "3 Months",
    type: "Paid",
    skills: ["Figma", "UI Design", "UX Research"],
  },
];

const Internshipcards = () => {
  return (
    <>
      {internships.map((internship, index) => (
        <div className="internship-card" key={index}>
          <div className="internship-card-top">
            <div className="company-logo">{internship.icon}</div>
            <div className="match">{internship.match}% Match</div>
          </div>

          <h2>{internship.title}</h2>
          <div className="company">{internship.company}</div>

          <div className="details">
            <div className="detail">📍 {internship.location}</div>
            <div className="detail">⏱ {internship.duration}</div>
            <div className="detail">💰 {internship.type}</div>
          </div>

          <div className="skills-title">Required Skills</div>
          <div className="skills">
            {internship.skills.map((skill, skillIndex) => (
              <span className="skill" key={skillIndex}>
                {skill}
              </span>
            ))}
          </div>

          <button className="apply-btn">Apply Now →</button>
        </div>
      ))}
    </>
  );
};

export default Internshipcards;