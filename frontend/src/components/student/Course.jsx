import React from "react";

function Courses() {
  const courses = [
    {
      title: "Web Development",
      description:
        "Learn HTML, CSS, JavaScript and build modern responsive websites.",
    },
    {
      title: "Python Programming",
      description:
        "Learn Python fundamentals, functions, OOP and real-world programming.",
    },
    {
      title: "Data Analytics",
      description:
        "Learn Excel, SQL, Power BI and data visualization.",
    },
    // {
    //   title: "Artificial Intelligence",
    //   description:
    //     "Understand AI, machine learning, NLP and practical applications.",
    // },
    // {
    //   title: "Cloud Computing",
    //   description:
    //     "Learn cloud concepts, deployment, storage and cloud security.",
    // },
  ];

  return (
    <>
  
    <div className="min-h-screen bg-[#f5f7ff] text-[#172033] logo-slide-up">
      <div className="px-[7%] py-[60px]">

        {/* Heading */}
        <h1 className="text-[40px] font-bold mb-2">
          📚 Courses
        </h1>

        <p className="text-[#687083] mb-10">
          Learn industry-relevant skills through courses uploaded by our
          faculty.
        </p>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">

          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-[25px] rounded-[15px] shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-[6px]"
            >
              <div></div>

              <h2 className="text-2xl font-bold mt-2">
                {course.title}
              </h2>

              <p className="text-[#315bd6] font-bold mt-3">
                {/* Faculty name can be added here */}
              </p>

              <p className="text-[#687083] leading-[1.5] mt-2 mb-5">
                {course.description}
              </p>

              <button
                className="bg-[#b68961] text-white border-none py-[11px] px-5 rounded-[7px] cursor-pointer hover:opacity-90 transition"
              >
                View Course
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
    </>
  );
}

export default Courses;

