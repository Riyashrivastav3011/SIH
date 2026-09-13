
import React from 'react'
import './Student.css'


function Reviews() {
  return (
    <section className="reviews-section">

      <h1>⭐ Student Reviews</h1>

      <p className="reviews-subtitle">
        See what students say about their SkillBridge journey.
      </p>

      <div className="review-grid">

        <div className="review-card">
          <div className="stars">
            ★★★★★
          </div>

          <p>
            “SkillBridge helped me understand which skills
            I was missing for my target career.”
          </p>

          <div className="student">
            — Priya, Computer Science Student
          </div>
        </div>


        <div className="review-card">
          <div className="stars">
            ★★★★★
          </div>

          <p>
            “The personalized roadmap made it much easier
            for me to decide what I should learn next.”
          </p>

          <div className="student">
            — Rahul, Engineering Student
          </div>
        </div>


        <div className="review-card">
          <div className="stars">
            ★★★★★
          </div>

          <p>
            “Finding internships according to my skills
            became much easier.”
          </p>

          <div className="student">
            — Anjali, IT Student
          </div>
        </div>

      </div>

    </section>
  )
}

export default Reviews
