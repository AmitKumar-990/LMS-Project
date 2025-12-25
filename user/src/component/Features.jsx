import {
  AcademicCapIcon,
  ClockIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Expert-Led Courses",
    description: "Learn directly from industry professionals and experienced instructors.",
    icon: AcademicCapIcon,
  },
  {
    title: "Flexible Learning",
    description: "Study anytime, anywhere, at your own pace with lifetime access.",
    icon: ClockIcon,
  },
  {
    title: "Global Community",
    description: "Connect with learners and instructors from around the world.",
    icon: GlobeAltIcon,
  },
  {
    title: "Certified Completion",
    description: "Earn industry-recognized certificates after completing courses.",
    icon: CheckBadgeIcon,
  },
  {
    title: "High-Quality Content",
    description: "Well-structured, practical, and regularly updated course materials.",
    icon: BookOpenIcon,
  },
  {
    title: "Trusted by Learners",
    description: "Thousands of students trust Get-Skillz to grow their careers.",
    icon: UsersIcon,
  },
];

export default function Features() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose <span className="text-blue-600">Get-Skillz?</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Everything you need to learn, grow, and succeed — all in one platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition">
                <f.icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
