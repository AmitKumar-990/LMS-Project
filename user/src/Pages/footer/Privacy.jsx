import Navbar from "../../component/home/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Your privacy matters. This policy explains how Get-Skillz collects,
          uses, and protects your information.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 text-gray-700">

          {/* SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect personal information such as your name, email address,
              payment details, and course activity when you create an account,
              enroll in courses, or interact with our platform.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>To provide and improve our learning services</li>
              <li>To process payments and enrollments</li>
              <li>To personalize your learning experience</li>
              <li>To communicate important updates and offers</li>
            </ul>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies to enhance your browsing experience, remember
              preferences, and analyze platform usage. You can control cookies
              through your browser settings.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              data from unauthorized access, misuse, or disclosure.
            </p>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Your Rights
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of promotional communications</li>
            </ul>
          </div>

          {/* SECTION */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          {/* CONTACT */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us at:
            </p>
            <p className="mt-2 font-medium text-blue-600">
              get.skillz.help@gmail.com
            </p>
          </div>

        </div>
      </section>
    </div>
    </>
  );
}
