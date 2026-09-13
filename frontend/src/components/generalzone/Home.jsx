import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Courses from '../student/Course'
import Internships from '../student/Internshipcards'
import Reviews from '../student/Reviews'
import Animations from './Animations'
import Footer from './Footer'

function Home() {
  return (
    <>
    <Header/>
    <Hero/>
<Animations className="scroll-animation">
  <Courses />
     <h1 className="text-[40px] px-[7%] font-bold mb-2">
        Internships and jobs 
    </h1>
      <p className="text-[#687083] px-[7%] mb-10">
          Get internships and jobs which matches you skillset 
    </p>
    
      <section className="internship-container">
        <div className="internship-grid">
          <Internships />
        </div>
      </section>
    <Reviews/>
</Animations>
 <Footer/>
    
    </>
  )
}

export default Home