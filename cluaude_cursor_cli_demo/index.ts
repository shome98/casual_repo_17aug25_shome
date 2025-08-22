import { OpenAI } from "openai";
// const api_key =
//   "";
const api_key = "";
// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: api_key,
// });
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: api_key,
});
// const model = "deepseek/deepseek-r1-0528:free";
const model = "openai/gpt-oss-20b:fireworks-ai";

async function chatCall(prompt: string) {
    try {
        const completion = await client.chat.completions.create({
          model: model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });
      console.log("total object",completion);
        console.log("message is",completion?.choices[0]?.message);
    } catch (error) {
        throw Error("Could not recieve a response");
    }
    
}

chatCall("Can you create a package.json file in my pc?").then().catch(error => console.log(`erorr is ${error}`));