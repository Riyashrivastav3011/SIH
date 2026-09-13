import React, { useState } from "react";
import {
  Upload,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  Plus,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function StudentProfile() {
  const [resumeFile, setResumeFile] = useState(null);

  const [career, setCareer] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [workMode, setWorkMode] = useState("Remote");

  const [institution, setInstitution] = useState({
    collegeName: "",
    course: "",
    branch: "",
    year: "",
    rollNumber: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [trainings, setTrainings] = useState([]);
  const [newTraining, setNewTraining] = useState({
    type: "Internship",
    organization: "",
    role: "",
    duration: "",
    description: "",
  });

  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    issuer: "",
    date: "",
    link: "",
  });

  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
  });

  const updateInstitution = (field, value) => {
    setInstitution((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Resume
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResumeFile(file);
    }
  };

  // Skills
  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }

    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Training
  const addTraining = () => {
    if (
      !newTraining.organization.trim() ||
      !newTraining.role.trim()
    ) {
      return;
    }

    setTrainings([...trainings, newTraining]);

    setNewTraining({
      type: "Internship",
      organization: "",
      role: "",
      duration: "",
      description: "",
    });
  };

  const removeTraining = (index) => {
    setTrainings(trainings.filter((_, i) => i !== index));
  };

  // Certificates
  const addCertificate = () => {
    if (!newCertificate.name.trim()) {
      return;
    }

    setCertificates([...certificates, newCertificate]);

    setNewCertificate({
      name: "",
      issuer: "",
      date: "",
      link: "",
    });
  };

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  // Activities
  const addActivity = () => {
    if (!newActivity.title.trim()) {
      return;
    }

    setActivities([...activities, newActivity]);

    setNewActivity({
      title: "",
      description: "",
    });
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  // Frontend only
  const handleContinue = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b68961]/10 to-[#b68961]/20 p-6">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#b68961] mb-2">
            Complete Your Profile
          </h1>

          <p className="text-gray-500 text-sm">
            Help us understand your skills and career goals
          </p>
        </div>

        {/* PROGRESS */}
        <div className="flex items-center justify-center mb-10">

          <div className="w-9 h-9 rounded-full bg-[#b68961] text-white flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>

          <div className="w-16 md:w-24 h-1 bg-[#b68961]" />

          <div className="w-9 h-9 rounded-full bg-[#b68961] text-white flex items-center justify-center font-bold">
            2
          </div>

          <div className="w-16 md:w-24 h-1 bg-[#b68961]" />

          <div className="w-9 h-9 rounded-full bg-[#b68961]/30 text-[#b68961] flex items-center justify-center font-bold">
            3
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* RESUME */}
          <div className="bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
              <Upload size={20} className="text-[#b68961]" />
              Upload Resume
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Upload your latest resume for AI skill analysis.
            </p>

            <label
              htmlFor="resume"
              className="flex flex-col items-center justify-center text-center border-2 border-dashed border-[#b68961]/50 rounded-xl bg-white hover:bg-[#b68961]/10 transition-colors cursor-pointer py-8 px-4"
            >

              <Upload
                size={32}
                className="text-[#b68961] mb-2"
              />

              <strong className="text-[#b68961] text-sm mb-1">
                Click to upload your resume
              </strong>

              <span className="text-gray-400 text-xs">
                PDF, DOC or DOCX • Max 5MB
              </span>

            </label>

            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
            />

            {resumeFile && (
              <div className="mt-3 text-sm font-semibold text-[#b68961]">
                ✓ {resumeFile.name}
              </div>
            )}

          </div>

          {/* CAREER */}
          <div className="bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
              <Briefcase size={20} className="text-[#b68961]" />
              Career Goal
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Select the career you want to pursue.
            </p>

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Target Career
            </label>

            <select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
            >

              <option value="">
                Select your career
              </option>

              <option>Software Developer</option>
              <option>Data Analyst</option>
              <option>Data Scientist</option>
              <option>AI / ML Engineer</option>
              <option>Web Developer</option>
              <option>Cyber Security</option>
              <option>Cloud Engineer</option>

            </select>

          </div>

          {/* INSTITUTION */}
          <div className="md:col-span-2 bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
              <GraduationCap size={20} className="text-[#b68961]" />
              Institution Details
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Tell us about the college or institute you're enrolled in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Institution / College Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. IIT Delhi"
                  value={institution.collegeName}
                  onChange={(e) =>
                    updateInstitution(
                      "collegeName",
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Course / Degree
                </label>

                <input
                  type="text"
                  placeholder="e.g. B.Tech"
                  value={institution.course}
                  onChange={(e) =>
                    updateInstitution(
                      "course",
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Branch / Specialization
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={institution.branch}
                  onChange={(e) =>
                    updateInstitution(
                      "branch",
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Year of Study
                </label>

                <select
                  value={institution.year}
                  onChange={(e) =>
                    updateInstitution(
                      "year",
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
                >

                  <option value="">
                    Select year
                  </option>

                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Graduated</option>

                </select>
              </div>

              <div className="sm:col-span-2">

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Roll Number / Enrollment ID (optional)
                </label>

                <input
                  type="text"
                  placeholder="e.g. 21BCS1234"
                  value={institution.rollNumber}
                  onChange={(e) =>
                    updateInstitution(
                      "rollNumber",
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
                />

              </div>

            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Your Skills
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Enter the skills you currently have.
            </p>

            <div className="flex gap-2">

              <input
                type="text"
                placeholder="e.g. Python"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                onKeyDown={handleSkillKeyDown}
                className="flex-1 h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
              />

              <button
                type="button"
                onClick={addSkill}
                className="w-12 rounded-lg bg-[#b68961] text-white flex items-center justify-center hover:opacity-90 transition"
              >
                <Plus size={20} />
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[#b68961]/20 text-[#b68961] text-xs font-medium px-3 py-1.5 rounded-full"
                >

                  {skill}

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(index)
                    }
                  >
                    <X size={14} />
                  </button>

                </div>
              ))}

            </div>

          </div>

          {/* SKILL LEVEL */}
          <div className="bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Skill Level
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Tell us about your overall technical level.
            </p>

            <div className="mb-4">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Overall Skill Level
              </label>

              <select
                value={skillLevel}
                onChange={(e) =>
                  setSkillLevel(e.target.value)
                }
                className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
              >

                <option value="">
                  Select level
                </option>

                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Preferred Work Mode
              </label>

              <select
                value={workMode}
                onChange={(e) =>
                  setWorkMode(e.target.value)
                }
                className="w-full h-12 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b68961]"
              >

                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>

              </select>

            </div>

          </div>

          {/* TRAINING */}
          <div className="md:col-span-2 bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
              <Briefcase size={20} className="text-[#b68961]" />
              Training & Internships
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Add any internships or training programs you've completed.
            </p>

            <div className="space-y-3 mb-5">

              {trainings.map((training, index) => (

                <div
                  key={index}
                  className="flex items-start justify-between bg-white rounded-xl p-4 border border-gray-200"
                >

                  <div>

                    <div className="text-xs font-semibold text-[#b68961] uppercase mb-1">
                      {training.type}
                    </div>

                    <div className="font-semibold text-gray-800 text-sm">
                      {training.role} · {training.organization}
                    </div>

                    {training.duration && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        {training.duration}
                      </div>
                    )}

                    {training.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {training.description}
                      </p>
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeTraining(index)
                    }
                  >
                    <X
                      size={16}
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>

                </div>

              ))}

            </div>

            <div className="bg-white rounded-xl p-4 border border-dashed border-gray-300">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">

                <select
                  value={newTraining.type}
                  onChange={(e) =>
                    setNewTraining((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                >
                  <option>Internship</option>
                  <option>Training</option>
                </select>

                <input
                  type="text"
                  placeholder="Organization / Company"
                  value={newTraining.organization}
                  onChange={(e) =>
                    setNewTraining((prev) => ({
                      ...prev,
                      organization: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

                <input
                  type="text"
                  placeholder="Role / Title"
                  value={newTraining.role}
                  onChange={(e) =>
                    setNewTraining((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

                <input
                  type="text"
                  placeholder="Duration (e.g. Jun–Aug 2025)"
                  value={newTraining.duration}
                  onChange={(e) =>
                    setNewTraining((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

              </div>

              <textarea
                placeholder="Short description of what you did (optional)"
                value={newTraining.description}
                onChange={(e) =>
                  setNewTraining((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-3"
              />

              <button
                type="button"
                onClick={addTraining}
                className="flex items-center gap-1 text-sm font-semibold text-[#b68961] hover:opacity-80"
              >
                <Plus size={16} />
                Add Entry
              </button>

            </div>

          </div>

          {/* CERTIFICATES */}
          <div className="md:col-span-2 bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
              <Award size={20} className="text-[#b68961]" />
              Certificates
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Add certifications or courses you've completed.
            </p>

            <div className="space-y-3 mb-5">

              {certificates.map((certificate, index) => (

                <div
                  key={index}
                  className="flex items-start justify-between bg-white rounded-xl p-4 border border-gray-200"
                >

                  <div>

                    <div className="font-semibold text-gray-800 text-sm">
                      {certificate.name}
                    </div>

                    <div className="text-xs text-gray-400 mt-0.5">
                      {certificate.issuer}
                      {certificate.date &&
                        ` · ${certificate.date}`}
                    </div>

                    {certificate.link && (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#b68961] underline"
                      >
                        View credential
                      </a>
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeCertificate(index)
                    }
                  >
                    <X
                      size={16}
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>

                </div>

              ))}

            </div>

            <div className="bg-white rounded-xl p-4 border border-dashed border-gray-300">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">

                <input
                  type="text"
                  placeholder="Certificate name"
                  value={newCertificate.name}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

                <input
                  type="text"
                  placeholder="Issued by"
                  value={newCertificate.issuer}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      issuer: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

                <input
                  type="text"
                  placeholder="Date (e.g. Mar 2025)"
                  value={newCertificate.date}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

                <input
                  type="text"
                  placeholder="Credential link (optional)"
                  value={newCertificate.link}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }))
                  }
                  className="h-11 rounded-lg border border-gray-300 px-3 text-sm"
                />

              </div>

              <button
                type="button"
                onClick={addCertificate}
                className="flex items-center gap-1 text-sm font-semibold text-[#b68961] hover:opacity-80"
              >
                <Plus size={16} />
                Add Certificate
              </button>

            </div>

          </div>

          {/* ACTIVITIES */}
          <div className="md:col-span-2 bg-[#b68961]/10 rounded-2xl p-6">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-1">
              <Trophy size={20} className="text-[#b68961]" />
              Additional Activities
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              Hackathons, clubs, volunteering, competitions — anything else worth showing off.
            </p>

            <div className="space-y-3 mb-5">

              {activities.map((activity, index) => (

                <div
                  key={index}
                  className="flex items-start justify-between bg-white rounded-xl p-4 border border-gray-200"
                >

                  <div>

                    <div className="font-semibold text-gray-800 text-sm">
                      {activity.title}
                    </div>

                    {activity.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.description}
                      </p>
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeActivity(index)
                    }
                  >
                    <X
                      size={16}
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>

                </div>

              ))}

            </div>

            <div className="bg-white rounded-xl p-4 border border-dashed border-gray-300">

              <input
                type="text"
                placeholder="Activity title (e.g. Smart India Hackathon 2024 - Finalist)"
                value={newActivity.title}
                onChange={(e) =>
                  setNewActivity((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm mb-3"
              />

              <textarea
                placeholder="Short description (optional)"
                value={newActivity.description}
                onChange={(e) =>
                  setNewActivity((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-3"
              />

              <button
                type="button"
                onClick={addActivity}
                className="flex items-center gap-1 text-sm font-semibold text-[#b68961] hover:opacity-80"
              >
                <Plus size={16} />
                Add Activity
              </button>

            </div>

          </div>

        </div>

        {/* CONTINUE BUTTON */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 mt-6 rounded-xl bg-[#b68961] hover:opacity-90 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
        >
          Continue to AI Skill Analysis
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}

export default StudentProfile;