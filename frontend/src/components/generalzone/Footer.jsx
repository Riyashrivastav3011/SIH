import React from 'react'
import Logo from '../../assets/img.png'
import './RegistrationPage.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo & About */}
        <div className="footer-about">

          <div className="footer-logo">
            <img src={Logo} className='' alt="SkillBridge Logo" />
            <h2>SkillBridge</h2>
          </div>

          <p>
            Connecting skills, opportunities and careers
            through one unified platform.
          </p>

          <p className="since">
            SINCE 2026
          </p>

        </div>


        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/courses">Explore Courses</a>
          <a href="/internships">Internships</a>
        </div>


        {/* Platform */}
        <div className="footer-links">
          <h3>Platform</h3>

          <a href="/student">Students</a>
          <a href="/industry">Industries</a>
          <a href="/academician">Academicians</a>
          <a href="/institution">Institutions</a>
        </div>


        {/* Contact */}
        <div className="footer-links">
          <h3>Connect</h3>

          <p>📧 skillbridge@gmail.com</p>
          <p>📍 India</p>

          <div className="footer-social">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>GitHub</span>
          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 SkillBridge. All rights reserved.
        </p>

        <p>
          Bridging Skills with Opportunities
        </p>
      </div>

    </footer>
  )
}

export default Footer