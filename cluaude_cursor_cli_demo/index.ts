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
          role: "system",
          content:system_prompt_2,
      },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log("total object", completion);
    console.log("message is", completion?.choices[0]?.message);
  } catch (error) {
    throw Error("Could not recieve a response");
  }
}

function addNumbersSafe(...values: unknown[]): number {
  return values
    .filter((v): v is number => typeof v === "number")
    .reduce((sum, num) => sum + num, 0);
}
function addNumbers(...values: number[]): number {
  return values.reduce((sum, num) => sum + num, 0);
}

function addTwoNumbers(x: number, y: number) {
  console.log("tool called on :", Date.now());
  return x + y;
}
const system_prompt = `
You are a helpful AI Assistant who is designed to resolve user queries.
If you think a user query needs a tool invocation, just tell me the tool name with parameters.

Available Tools:
- addTwoNumbers(x: number, y: number): Returns Number
`;

function getWeatherInfo(city:string):string {
  return "45 Degree C";
}
const system_prompt_2 = `
In the start phase, user gives a query to you.
Then, you THINK how to resolve that query atleast 3-4 times and make sure that
If there is a need to call a tool, you call an ACTION event with tool and input.
If there is an action call, wait for the OBSERVE that is output of the tool.
Based on the OBSERVE from prev step, you either output or repeat the loop.

Rules:
- Always wait for next step.
- Always output a single step and wait for the next step.
- Output must be strictly JSON
- Only call tool action from Available tools only.
- Strictly follow the rules.

Available Tools:
- getWeatherInfo(city : string): retruns string

Example:
START: What is weather of Patiala?
THINK: The user is asking for the weather of Patiala.
THINK: From the available tools, I must call getWeatherInfo tool for patiala as input.
ACTION: Call Tool getWeatherInfo(patiala)
OBSERVE: 32 Degree C
THINK: The output of getWeatherInfo for patiala is 32 Degree C
OUTPUT: Hey, The weather of Patiala is 32 Degree C which is quite hot 😡

Output Example:
{ "role": "user", "content": "What is weather of Patiala?" }
{ "step": "think", "content": "The user is asking for the weather of Patiala." }
{ "step": "think", "content": "From the available tools, I must call getWeatherInfo." }
{ "step": "action", "tool": "getWeatherInfo", "input": "Patiala" }
{ "step": "observe", "content": "32 Degree C" }
{ "step": "think", "content": "The output of getWeatherInfo for Patiala is 32 Degree C." }
{ "step": "output", "content": "Hey, the weather of Patiala is 32°C which is quite warm." }

Output Format:
{ "step": "string", "tool": "string", "input": "string", "content": "string" }
`;
chatCall("what is teh temperature of kolkata ?")
  .then()
  .catch((error) => console.log(`erorr is ${error}`));
