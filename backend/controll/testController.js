import TestSession from "../models/TestSession.js";
import Course from "../models/Course.js";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateTestQuestions = async(req, res) => {
        try {
            const { courseId } = req.params;
            const userId = req.user.id;

            // Load course data
            const course = await Course.findById(courseId).populate("chapters");
            if (!course) return res.status(404).json({ message: "Course not found" });

            // Prepare course content for AI
            const content = `
      Course Title: ${course.title}
      Description: ${course.description}

      Chapters:
      ${course.chapters
        .map(
          (ch, i) => `
        ${i + 1}. ${ch.title}
        ${ch.description}
      `
        )
        .join("\n")}
    `;

    // Ask AI to generate MCQs
    const prompt = `
    Based on the following course content, generate EXACTLY 10 multiple-choice questions.
    Each question MUST include:
    - question
    - 4 options (A, B, C, D)
    - correct answer (A/B/C/D)

    Format as a JSON array like this:

    [
      {
        "question": "What is React?",
        "options": ["A...", "B...", "C...", "D..."],
        "correctAnswer": "A"
      }
    ]

    Course Content:
    ${content}
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const text = response.choices[0].message.content;
    const questions = JSON.parse(text);

    // Save to MongoDB
    const session = await TestSession.create({
      userId,
      courseId,
      questions,
    });

    res.json({ success: true, questions, sessionId: session._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI generation error", error: err.message });
  }
};