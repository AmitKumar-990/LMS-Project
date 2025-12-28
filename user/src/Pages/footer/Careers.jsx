import { useState } from "react";
import Navbar from "../../component/home/Navbar";

const jobs = [
  {
    role: "Frontend Developer",
    type: "Internship / Full-time",
    location: "Remote",
    desc:
      "Work with React, Tailwind, and modern UI to build user-friendly learning experiences.",
  },
  {
    role: "Backend Developer",
    type: "Full-time",
    location: "Remote",
    desc:
      "Design scalable APIs, handle payments, and build secure LMS features.",
  },
  {
    role: "UI / UX Designer",
    type: "Internship",
    location: "Remote",
    desc:
      "Design intuitive interfaces and improve user experience across the platform.",
  },
];

export default function Careers() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Build the Future of Learning
        </h1>
        <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
          Join Get-Skillz and help learners gain real-world skills that matter.
        </p>
      </section>

      {/* WHY JOIN */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Join Get-Skillz?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Remote First",
              desc: "Work from anywhere and maintain a healthy work-life balance.",
            },
            {
              title: "Learn & Grow",
              desc: "Upskill continuously with access to all platform courses.",
            },
            {
              title: "Impactful Work",
              desc: "Your work directly helps thousands of learners grow.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl hover:shadow-lg transition text-center"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Open Positions
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 cursor-pointer hover:shadow-md transition"
              onClick={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="text-sm text-gray-500">
                    {job.type} • {job.location}
                  </p>
                </div>
                <span className="text-blue-600 font-bold">
                  {openIndex === i ? "−" : "+"}
                </span>
              </div>

              {openIndex === i && (
                <p className="mt-4 text-gray-600">
                  {job.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* LIFE AT GET-SKILLZ */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Life at Get-Skillz
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          {[
            "Flexible Work Hours",
            "Learning Culture",
            "Open Communication",
            "Career Growth",
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-xl font-medium text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Join Our Team?
        </h2>
        <p className="text-blue-100 mb-8">
          Send us your resume and let’s build something meaningful together.
        </p>

        <a
          href="mailto:careers@get-skillz.com"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Apply Now
        </a>
      </section>

    </div>
    </>
  );
}
