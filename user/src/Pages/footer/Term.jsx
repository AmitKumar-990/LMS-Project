import Navbar from "../../component/home/Navbar";

export default function TermsConditions() {
  return (
    <>
    <Navbar />
    <div className="bg-white">

      {/* HERO */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Please read these terms carefully before using the Get-Skillz platform.
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 text-gray-700">

          {/* 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              By accessing or using Get-Skillz, you agree to comply with and be
              bound by these Terms & Conditions. If you do not agree, please do
              not use our platform.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. User Eligibility
            </h2>
            <p>
              You must be at least 13 years old to use Get-Skillz. By creating an
              account, you confirm that the information you provide is accurate
              and complete.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Account Responsibilities
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>You are responsible for maintaining account security</li>
              <li>You must not share your login credentials</li>
              <li>You are responsible for all activity under your account</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Courses, Payments & Access
            </h2>
            <p>
              Once enrolled, you receive access to course content as described.
              Payments are non-refundable unless explicitly stated otherwise.
              Get-Skillz reserves the right to modify course content at any time.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Intellectual Property
            </h2>
            <p>
              All content, including videos, text, logos, and designs, belongs
              to Get-Skillz or its instructors and is protected by copyright
              laws. You may not copy, distribute, or resell any content.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Prohibited Activities
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Sharing or reselling course content</li>
              <li>Attempting to hack or disrupt the platform</li>
              <li>Using the platform for illegal purposes</li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Account Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these terms or engage in harmful activities.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              Get-Skillz is not responsible for any indirect or consequential
              losses arising from the use of our platform or courses.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              9. Changes to These Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time. Continued use
              of the platform after changes means you accept the updated terms.
            </p>
          </div>

          {/* 10 */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms & Conditions, contact
              us at:
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
