import { OpenAI } from "openai";
const api_key =
  "";
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: api_key,
});

async function chatCall(prompt: string) {
    try {
        const completion = await client.chat.completions.create({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });
        console.log(completion?.choices[0]?.message);
    } catch (error) {
        throw Error("Could not recieve a response");
    }
    
}

chatCall("Who are you?").then().catch(error => console.log(`erorr is ${error}`));