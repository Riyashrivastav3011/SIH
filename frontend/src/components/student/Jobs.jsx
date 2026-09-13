
import React, { useState } from "react";
import "./Student.css";
import Header from '../generalzone/Header'
import Footer from '../generalzone/Footer'

const jobData = [
  {
    id: 1,
    icon: "💻",
    title: "Software Developer",
    company: "TechNova Solutions",
    location: "bengaluru",
    locationText: "Bengaluru",
    mode: "hybrid",
    salary: "6-10",
    salaryText: "6–10 LPA",
    companyType: "mnc",
    department: "engineering",
    education: "btech",
    jobtype: "fulltime",
    jobtypeText: "Full Time",
    experience: 0,
    match: 94,
    titleData: "software developer technova java react sql git",
    skills: ["Java", "React", "SQL", "Git"],
  },

  {
    id: 2,
    icon: "📊",
    title: "Data Analyst",
    company: "DataCore Analytics",
    location: "delhi",
    locationText: "Delhi / NCR",
    mode: "office",
    salary: "3-6",
    salaryText: "3–6 LPA",
    companyType: "corporate",
    department: "data",
    education: "mca",
    jobtype: "fulltime",
    jobtypeText: "Full Time",
    experience: 1,
    match: 89,
    titleData: "data analyst datacore python sql power bi excel",
    skills: ["Python", "SQL", "Excel", "Power BI"],
  },

  {
    id: 3,
    icon: "🤖",
    title: "AI / ML Engineer",
    company: "FutureAI Labs",
    location: "pune",
    locationText: "Pune",
    mode: "remote",
    salary: "10-15",
    salaryText: "10–15 LPA",
    companyType: "startup",
    department: "data",
    education: "btech",
    jobtype: "fulltime",
    jobtypeText: "Full Time",
    experience: 2,
    match: 86,
    titleData:
      "ai ml engineer futureai python machine learning nlp tensorflow",
    skills: ["Python", "Machine Learning", "NLP", "TensorFlow"],
  },

  {
    id: 4,
    icon: "🎨",
    title: "UI/UX Designer",
    company: "Creative Pixel Studio",
    location: "mumbai",
    locationText: "Mumbai",
    mode: "hybrid",
    salary: "3-6",
    salaryText: "3–6 LPA",
    companyType: "startup",
    department: "design",
    education: "graduate",
    jobtype: "fulltime",
    jobtypeText: "Full Time",
    experience: 0,
    match: 81,
    titleData: "ui ux designer creative pixel figma design",
    skills: ["Figma", "UI Design", "UX Research"],
  },

  {
    id: 5,
    icon: "🌐",
    title: "Frontend Developer",
    company: "WebCraft Technologies",
    location: "bengaluru",
    locationText: "Bengaluru",
    mode: "office",
    salary: "6-10",
    salaryText: "6–10 LPA",
    companyType: "mnc",
    department: "engineering",
    education: "btech",
    jobtype: "fulltime",
    jobtypeText: "Full Time",
    experience: 1,
    match: 90,
    titleData:
      "frontend developer webcraft html css javascript react",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },

  {
    id: 6,
    icon: "📢",
    title: "Digital Marketing Executive",
    company: "GrowthWorks",
    location: "jhansi",
    locationText: "Jhansi",
    mode: "remote",
    salary: "0-3",
    salaryText: "0–3 LPA",
    companyType: "corporate",
    department: "marketing",
    education: "graduate",
    jobtype: "parttime",
    jobtypeText: "Part Time",
    experience: 0,
    match: 78,
    titleData:
      "digital marketing executive marketing seo social media",
    skills: ["SEO", "Marketing", "Social Media"],
  },
];

const getInitialFilters = () => ({
  mode: [],
  location: [],
  salary: [],
  companyType: [],
  department: [],
  education: [],
  jobtype: [],
});

function Jobs() {
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("all");

  const [filters, setFilters] = useState(getInitialFilters);

  const [experience, setExperience] = useState(10);

  const [sort, setSort] = useState("relevance");

  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const currentValues = prev[type];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [type]: updatedValues,
      };
    });
  };

  const clearFilters = () => {
    setFilters(getInitialFilters());
    setExperience(10);
    setSearch("");
    setSearchLocation("all");
    setSort("relevance");
  };

  const applyJob = (jobName) => {
    alert(
      `Application started for ${jobName}!\n\nYour SkillBridge profile will be used for this application.`
    );
  };

  const filteredJobs = jobData.filter((job) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      searchText === "" ||
      job.titleData.toLowerCase().includes(searchText);

    const matchesSearchLocation =
      searchLocation === "all" ||
      job.location === searchLocation;

    const matchesMode =
      filters.mode.length === 0 ||
      filters.mode.includes(job.mode);

    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.includes(job.location);

    const matchesSalary =
      filters.salary.length === 0 ||
      filters.salary.includes(job.salary);

    const matchesCompany =
      filters.companyType.length === 0 ||
      filters.companyType.includes(job.companyType);

    const matchesDepartment =
      filters.department.length === 0 ||
      filters.department.includes(job.department);

    const matchesEducation =
      filters.education.length === 0 ||
      filters.education.includes(job.education);

    const matchesJobType =
      filters.jobtype.length === 0 ||
      filters.jobtype.includes(job.jobtype);

    const matchesExperience =
      experience === 10 || job.experience <= experience;

    return (
      matchesSearch &&
      matchesSearchLocation &&
      matchesMode &&
      matchesLocation &&
      matchesSalary &&
      matchesCompany &&
      matchesDepartment &&
      matchesEducation &&
      matchesJobType &&
      matchesExperience
    );
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort === "salary") {
      const salaryA = parseInt(a.salary.split("-")[0]);
      const salaryB = parseInt(b.salary.split("-")[0]);

      return salaryB - salaryA;
    }

    return 0;
  });

  const renderCheckbox = (type, value, label) => {
    return (
      <label>
        <input
          type="checkbox"
          checked={filters[type].includes(value)}
          onChange={() => handleCheckbox(type, value)}
        />

        {label}
      </label>
    );
  };

  return (
    <>
       <Header/>
        <div className="jobs-page">

      {/* ================= NAVBAR ================= */}

 

      {/* ================= HEADER ================= */}

      <section className="header">

        <h1>
          Find Your <span>Dream Job</span>
        </h1>

        <p>
          Discover jobs that match your skills,
          education, experience and career goals.
        </p>

      </section>


      {/* ================= SEARCH ================= */}

      <div className="search-area">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search job title, skills or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          >

            <option value="all">
              All Locations
            </option>

            <option value="bengaluru">
              Bengaluru
            </option>

            <option value="delhi">
              Delhi / NCR
            </option>

            <option value="pune">
              Pune
            </option>

            <option value="mumbai">
              Mumbai
            </option>

            <option value="jhansi">
              Jhansi
            </option>

          </select>

          <button>
            Search
          </button>

        </div>

      </div>


      {/* ================= JOB SECTION ================= */}

      <div className="job-section">


        {/* ================= FILTERS ================= */}

        <aside className="filters">

          <div className="filter-heading">

            <h2>All Filters</h2>

            <button
              className="clear-btn"
              onClick={clearFilters}
            >
              Clear All
            </button>

          </div>


          {/* WORK MODE */}

          <div className="filter">

            <h3>
              Work Mode
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "mode",
              "office",
              "Work from office"
            )}

            {renderCheckbox(
              "mode",
              "hybrid",
              "Hybrid"
            )}

            {renderCheckbox(
              "mode",
              "remote",
              "Remote"
            )}

          </div>


          {/* EXPERIENCE */}

          <div className="filter">

            <h3>
              Experience
              <span className="arrow">⌃</span>
            </h3>

            <input
              type="range"
              min="0"
              max="10"
              value={experience}
              onChange={(e) =>
                setExperience(Number(e.target.value))
              }
            />

            <div className="range-text">

              <span>0 Yrs</span>

              <span>
                {experience === 10
                  ? "Any"
                  : `${experience} Yrs`}
              </span>

            </div>

          </div>


          {/* LOCATION */}

          <div className="filter">

            <h3>
              Location
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "location",
              "jhansi",
              "Jhansi"
            )}

            {renderCheckbox(
              "location",
              "lucknow",
              "Lucknow"
            )}

            {renderCheckbox(
              "location",
              "bengaluru",
              "Bengaluru"
            )}

            {renderCheckbox(
              "location",
              "delhi",
              "Delhi / NCR"
            )}

            {renderCheckbox(
              "location",
              "pune",
              "Pune"
            )}

            <button className="view-more">
              View More
            </button>

          </div>


          {/* SALARY */}

          <div className="filter">

            <h3>
              Salary
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "salary",
              "0-3",
              "0–3 Lakhs"
            )}

            {renderCheckbox(
              "salary",
              "3-6",
              "3–6 Lakhs"
            )}

            {renderCheckbox(
              "salary",
              "6-10",
              "6–10 Lakhs"
            )}

            {renderCheckbox(
              "salary",
              "10-15",
              "10–15 Lakhs"
            )}

            <button className="view-more">
              View More
            </button>

          </div>


          {/* COMPANY TYPE */}

          <div className="filter">

            <h3>
              Company Type
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "companyType",
              "mnc",
              "Foreign MNC"
            )}

            {renderCheckbox(
              "companyType",
              "startup",
              "Startup"
            )}

            {renderCheckbox(
              "companyType",
              "corporate",
              "Corporate"
            )}

          </div>


          {/* DEPARTMENT */}

          <div className="filter">

            <h3>
              Department
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "department",
              "engineering",
              "Engineering - Software"
            )}

            {renderCheckbox(
              "department",
              "design",
              "UI/UX Design"
            )}

            {renderCheckbox(
              "department",
              "data",
              "Data Science"
            )}

            {renderCheckbox(
              "department",
              "marketing",
              "Marketing"
            )}

            <button className="view-more">
              View More
            </button>

          </div>


          {/* EDUCATION */}

          <div className="filter">

            <h3>
              Education
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "education",
              "graduate",
              "Any Graduate"
            )}

            {renderCheckbox(
              "education",
              "btech",
              "B.Tech / B.E."
            )}

            {renderCheckbox(
              "education",
              "mca",
              "MCA"
            )}

            {renderCheckbox(
              "education",
              "diploma",
              "Diploma"
            )}

          </div>


          {/* JOB TYPE */}

          <div className="filter">

            <h3>
              Job Type
              <span className="arrow">⌃</span>
            </h3>

            {renderCheckbox(
              "jobtype",
              "fulltime",
              "Full Time"
            )}

            {renderCheckbox(
              "jobtype",
              "parttime",
              "Part Time"
            )}

            {renderCheckbox(
              "jobtype",
              "contract",
              "Contract"
            )}

          </div>

        </aside>


        {/* ================= JOBS ================= */}

        <main className="jobs">

          <div className="job-top">

            <h2>
              Latest Job Opportunities
            </h2>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >

              <option value="relevance">
                Sort: Relevance
              </option>

              <option value="salary">
                Highest Salary
              </option>

            </select>

          </div>


          {/* JOB CARDS */}

          {sortedJobs.map((job) => (

            <div
              className="job-card"
              key={job.id}
            >

              <div className="company-icon">
                {job.icon}
              </div>


              <div className="job-info">

                <h2>
                  {job.title}
                </h2>

                <p className="company">
                  {job.company}
                </p>


                <div className="tags">

                  <span>
                    📍 {job.locationText}
                  </span>

                  <span>
                    💼 {job.jobtypeText}
                  </span>

                  <span>
                    💰 {job.salaryText}
                  </span>

                  <span>
                    🏢{" "}
                    {job.mode === "office"
                      ? "Office"
                      : job.mode === "hybrid"
                      ? "Hybrid"
                      : "Remote"}
                  </span>

                </div>


                <div className="skills">

                  {job.skills.map((skill, index) => (
                    <span key={index}>
                      {skill}
                    </span>
                  ))}

                </div>

              </div>


              <div className="job-right">

                <div className="match">
                  {job.match}% Match
                </div>

                <button
                  className="apply"
                  onClick={() => applyJob(job.title)}
                >
                  Apply Now
                </button>

              </div>

            </div>

          ))}


          {/* NO RESULT */}

          {sortedJobs.length === 0 && (

            <div className="no-result">

              <h2>
                No Jobs Found
              </h2>

              <p>
                Try changing your filters or search keywords.
              </p>

            </div>

          )}

        </main>

      </div>


    </div>
       <Footer/>
    </>
   
  );
}

export default Jobs;
