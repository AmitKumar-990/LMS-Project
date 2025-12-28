import { Target, Award, Star } from "lucide-react";

export default function InvestCareer() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
          Invest in your career
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="flex gap-4">
            <Target className="w-8 h-8 text-gray-900" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Explore new skills
              </h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                Access 10,000+ courses in AI, business, technology, and more.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex gap-4">
            <Award className="w-8 h-8 text-gray-900" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Earn valuable credentials
              </h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                Get certificates for every course you finish and boost your chances
                of getting hired at no additional cost.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex gap-4">
            <Star className="w-8 h-8 text-gray-900" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Learn from the best
              </h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                Take your skills to the next level with expert-led courses and
                AI-powered guidance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
