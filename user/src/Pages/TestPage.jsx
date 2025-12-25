import dummyTest from "../data/dummyTest";
import { useState } from "react";

export default function TestPage() {
  const [questions] = useState(dummyTest);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) {
    return <div className="p-10">No questions available</div>;
  }

  const q = questions[current];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">Final Assessment</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          {current + 1}. {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className="block w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              onClick={() => {
                if (idx === q.correctAnswer) setScore(score + 1);
                setCurrent(current + 1);
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Question {current + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}
