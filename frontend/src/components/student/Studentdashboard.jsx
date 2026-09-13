import React from "react";
import DashboardCard from "./Dashboardcard";
import "./dashboard.css";
import Header from '../generalzone/Header'
import Footer from '../generalzone/Footer'

function Studentdashboard() {
  const isLoggedIn = false;

  return (
   <>
   <Header/>
    <div className="dashboard">
        
      {/* TOP BAR */}
      <div className="dashboard-top">
        <div>
          <h1>
            {isLoggedIn ? "Welcome back, Student!" : "Welcome to ARCASS"}
          </h1>

          <p>
            {isLoggedIn
              ? "Here's your career progress at a glance."
              : "Build your skills. Discover opportunities. Shape your career."}
          </p>
        </div>

        <div className="profile-box">
          <div className="profile-circle">
            {isLoggedIn ? "S" : "G"}
          </div>

          <strong>
            {isLoggedIn ? "Student" : "Guest"}
          </strong>
        </div>

      </div>


      {/* STAT CARDS */}
      <div className="dashboard-cards">

        <DashboardCard
          icon="📊"
          value={isLoggedIn ? "78%" : "—"}
          title="Skill Match"
          message={!isLoggedIn && "Login to get your skill analysis"}
        />

        <DashboardCard
          icon="🎯"
          value={isLoggedIn ? "74/100" : "—"}
          title="Placement Readiness"
          message={!isLoggedIn && "Login to assess your skills"}
        />

        <DashboardCard
          icon="💼"
          value={isLoggedIn ? "12" : "—"}
          title="Recommended Internships"
          message={
            !isLoggedIn &&
            "Login to see internships matched to your skills"
          }
        />

        <DashboardCard
          icon="📚"
          value={isLoggedIn ? "5" : "—"}
          title="Skills to Improve"
          message={!isLoggedIn && "Login to identify your skill gaps"}
        />

      </div>


      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        {/* LEFT SIDE */}
        <div>

          {/* SKILL ANALYSIS */}
          <section className="dashboard-section">

            <div className="section-heading">
              <div>
                <h2>My Skill Analysis</h2>
                <p>Understand your current skill level</p>
              </div>
            </div>

            {!isLoggedIn ? (
              <div className="login-placeholder">

                <div className="placeholder-icon">📊</div>

                <h3>Login to get your Skill Analysis</h3>

                <p>
                  Assess your skills and discover where you stand
                  compared to industry requirements.
                </p>

                <button className="brown-btn">
                  Login to Assess Skills
                </button>

              </div>
            ) : (
              <>
                <div className="skill-item">
                  <div className="skill-title">
                    <span>Python</span>
                    <strong>80%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-title">
                    <span>SQL</span>
                    <strong>45%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-title">
                    <span>Power BI</span>
                    <strong>75%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-title">
                    <span>Excel</span>
                    <strong>90%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </>
            )}

          </section>


          {/* INTERNSHIPS */}
          <section className="dashboard-section">

            <div className="section-heading">
              <div>
                <h2>Recommended Internships</h2>
                <p>Opportunities based on your skills</p>
              </div>
            </div>

            {!isLoggedIn ? (
              <div className="login-placeholder small">

                <div className="placeholder-icon">💼</div>

                <h3>Login to see recommended internships</h3>

                <p>
                  We will match your skills with relevant internship
                  opportunities.
                </p>

                <button className="brown-btn">
                  Login to Explore
                </button>

              </div>
            ) : (
              <div>

                <div className="internship-card">
                  <div>
                    <h3>Data Analyst Intern</h3>
                    <p>Tech Solutions Pvt. Ltd.</p>
                    <span>✓ 92% Match</span>
                  </div>

                  <button className="outline-btn">
                    View
                  </button>
                </div>

                <div className="internship-card">
                  <div>
                    <h3>Business Analyst Intern</h3>
                    <p>Innovate India</p>
                    <span>✓ 86% Match</span>
                  </div>

                  <button className="outline-btn">
                    View
                  </button>
                </div>

              </div>
            )}

          </section>

        </div>


        {/* RIGHT SIDE */}
        <div>

          {/* SKILL GAPS */}
          <section className="dashboard-section">

            <h2>Skill Gaps</h2>

            {!isLoggedIn ? (
              <div className="mini-placeholder">

                <div className="placeholder-icon small-icon">
                  🎯
                </div>

                <h3>Identify Your Skill Gaps</h3>

                <p>
                  Login and assess your skills to know which
                  areas you need to improve.
                </p>

                <button className="brown-btn full-btn">
                  Login to Assess Skills
                </button>

              </div>
            ) : (
              <>
                <div className="gap">
                  <strong>SQL</strong>
                  <span>High</span>
                </div>

                <div className="gap">
                  <strong>Statistics</strong>
                  <span>Medium</span>
                </div>

                <div className="gap">
                  <strong>Machine Learning</strong>
                  <span>Medium</span>
                </div>
              </>
            )}

          </section>


          {/* AI ASSISTANT */}
          <section className="dashboard-section">

            <h2>AI Career Assistant</h2>

            {!isLoggedIn ? (
              <div className="mini-placeholder">

                <div className="placeholder-icon small-icon">
                  ✨
                </div>

                <h3>Your AI Career Guide</h3>

                <p>
                  Login to get personalized career guidance
                  based on your skills and goals.
                </p>

                <button className="brown-btn full-btn">
                  Login to Continue
                </button>

              </div>
            ) : (
              <>
                <p className="assistant-text">
                  Based on your profile, improving SQL and
                  Statistics can increase your Data Analyst
                  job readiness.
                </p>

                <button className="brown-btn full-btn">
                  Start AI Skill Analysis
                </button>
              </>
            )}

          </section>


          {/* NEXT STEP */}
          <section className="dashboard-section">

            <h2>Next Step</h2>

            {!isLoggedIn ? (
              <div className="mini-placeholder">

                <div className="placeholder-icon small-icon">
                  🚀
                </div>

                <h3>Start Your Career Journey</h3>

                <p>
                  Login to get a personalized learning roadmap
                  and recommended next steps.
                </p>

                <button className="brown-btn full-btn">
                  Login to Get Started
                </button>

              </div>
            ) : (
              <>
                <p className="assistant-text">
                  Complete your SQL module to improve your
                  placement readiness.
                </p>

                <button className="brown-btn full-btn">
                  View Learning Roadmap →
                </button>
              </>
            )}

          </section>

        </div>

      </div>
    </div>
    
      <Footer/>

    </>
  );
}

export default Studentdashboard;

