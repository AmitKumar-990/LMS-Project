const features = [
  {
    title: "Expert-Led Courses",
    // description: "Learn directly from professionals with real-world experience.",
    // icon: "/src/assets/icon-lightbulb.png",
  },
  {
    title: "Flexible Learning",
    // description: "Study anytime, anywhere, at your own pace.",
    // icon: "/src/assets/icon-shield.png",
  },
  {
    title: "Global Community",
    // description: "Connect and grow with learners from around the world.",
    // icon: "/src/assets/icon-globe.png",
  },
  {
    title: "Certified Course Completion",
    // description: "Receive industry-recognized certificates after completion.",
    // icon: "/src/assets/icon-globe.png",
  },
  {
    title: "High-Quality Course Content",
    // description: "Access well-structured and regularly updated learning material.",
    // icon: "/src/assets/icon-globe.png",
  },
  {
    title: "Trusted by Thousands of Learners",
    // description: "Join a platform trusted and recommended by countless students.",
    // icon: "/src/assets/icon-globe.png",
  },
];


export default function Features() {
  return (
    <section className="px-10 py-14 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100"
          >
            <img src={f.icon} alt="" className="w-10 mb-4" />
            <h3 className="text-gray-800 font-semibold text-lg">
              {f.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
