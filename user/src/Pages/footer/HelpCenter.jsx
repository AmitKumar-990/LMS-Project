import { useState } from "react";
import Navbar from "../../component/home/Navbar";

const faqs = [
  {
    q: "How do I enroll in a course?",
    a: "Simply browse courses, click on a course you like, and press the Enroll button. Complete payment to get instant access.",
  },
  {
    q: "How can I access my purchased courses?",
    a: "Go to the My Courses section from your dashboard. All enrolled courses will be listed there.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support UPI, credit/debit cards, and net banking through secure payment gateways.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Yes! All courses are self-paced so you can learn anytime, anywhere.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach us via email or the Contact Support button below.",
  },
];

export default function HelpCenter() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Help Center
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Need help? We’re here to guide you every step of your learning journey.
        </p>
      </section>

      {/* SEARCH */}
      <section className="py-10 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search for help topics..."
            className="w-full p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* TOPICS */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-2xl font-bold text-center mb-10">
          Popular Help Topics
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Account & Login", desc: "Login, signup, password issues" },
            { title: "Payments & Billing", desc: "Payments, refunds & invoices" },
            { title: "Courses & Access", desc: "Enrollments & course access" },
            { title: "Certificates", desc: "Completion & verification" },
            { title: "Technical Issues", desc: "Video, audio & loading problems" },
            { title: "Instructor Support", desc: "Teaching & course creation" },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">{t.title}</h3>
              <p className="text-gray-600 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 bg-white"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === i ? null : i)
                }
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium">{f.q}</span>
                <span className="text-xl">
                  {activeIndex === i ? "−" : "+"}
                </span>
              </button>

              {activeIndex === i && (
                <p className="text-gray-600 mt-3">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Still Need Help?
        </h2>
        <p className="text-blue-100 mb-8">
          Our support team is always ready to assist you.
        </p>

        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Contact Support
        </button>
      </section>

    </div>
    </>
  );
}
