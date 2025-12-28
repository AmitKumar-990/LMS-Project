const steps = [
  {
    step: "01",
    title: "Explore Courses",
    desc: "Browse high-quality courses designed by expert instructors.",
  },
  {
    step: "02",
    title: "Enroll & Learn",
    desc: "Enroll instantly and learn at your own pace from anywhere.",
  },
  {
    step: "03",
    title: "Earn Certificate",
    desc: "Complete the course and earn a verified certificate.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        How Get-Skillz Works
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div
            key={i}
            className="p-8 rounded-xl border text-center hover:shadow-lg transition"
          >
            <div className="text-blue-600 text-4xl font-extrabold mb-4">
              {s.step}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {s.title}
            </h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
