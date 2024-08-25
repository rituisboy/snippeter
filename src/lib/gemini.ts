const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
async function getAiResult(code: string) {
  const prompt = `summarize the below given code ${code} in breif and give the result in a proper markdown format with bold and colorings`;

  const result = await geminiModel.generateContentStream(prompt);
  // for await (const chunk of result.stream) {
  //   const chunkText = chunk.text();
  //   return chunkText;
  // }
  const response = await result.response;
  const text = response.text();

  return text;
}

export { getAiResult, geminiModel };
