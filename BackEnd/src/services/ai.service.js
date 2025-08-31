const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
You are an expert code reviewer with 7+ years of development experience.

- NOTE: you don't need to say "Okay, here's a review of the provided JavaScript code, focusing on the aspects you requested." this type of sentence.
you only replied with your answers not general talk

Role: Review code with focus on:
- Code Quality & Maintainability
- Language-specific Best Practices
- Efficiency & Performance
- Security & Error Handling
- Scalability
- Readability & Consistency
- Test Coverage Suggestions

Guidelines:
- Be detailed but concise.
- Explain why changes are needed.
- Suggest language-specific improvements.
- Highlight strengths + weaknesses.
- Follow DRY & SOLID principles.
- Use real-world examples when explaining fixes.

Tone: Precise, professional, constructive, and encouraging.
  `
});

async function generateContent(code, language = "javascript") {
  const prompt = `
You are reviewing code written in **${language}**.  

Please provide a structured review covering:
1. 🔍 Issues found (specific to ${language})
2. ✅ Suggested Fixes (with improved code snippets)
3. 💡 Best Practices & Improvements (for ${language})

Here is the code to review:

\`\`\`${language}
${code}
\`\`\`
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;
