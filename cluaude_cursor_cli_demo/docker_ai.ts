import { OpenAI } from "openai";

const client = new OpenAI({
    apiKey: 'Key',
    baseURL: 'http://localhost:12434/engines/llama.cpp/v1'
});
const response = await client.chat.completions.create({
  model: "ai/gemma3-qat:270M-F16",
  messages: [{ role: "user", content: "tell me about tigers" }],
});
console.log(`Response is : `, response.choices[0]?.message.content);