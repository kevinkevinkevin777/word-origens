import { OpenAI } from "openai-edge";
import { config } from "dotenv";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  const { word } = await req.json();

  const prompt = `Explain the etymology of the word "${word}" in a fun, engaging, and factual way.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an expert etymologist." },
      { role: "user", content: prompt }
    ]
  });

  const result = response.choices[0]?.message?.content;
  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" }
  });
}