import { OpenAI } from "openai";
// const api_key = "";
// const client = new OpenAI({
//   baseURL: "https://router.huggingface.co/v1",
//   apiKey: api_key,
// });
//const model = "openai/gpt-oss-20b:fireworks-ai";
const api_key = "";
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: api_key,
});
const model = "deepseek/deepseek-r1-0528:free";
const Tools = {
  getWeatherInfo: getWeatherInfo
};
function getWeatherInfo(city) {
  return `${city} has 45 Degree C`;
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
const messages = [
  {
    role: 'system',
    content:system_prompt_2
  }
];
const userQuery = 'what is the weather of Kolkata ';
messages.push({ 'role': 'user', 'content': userQuery });
async function init() {
    while (true) {
        const response = await client.chat.completions.create({
      model: model,
      response_format: { type: "json_object" },
      messages: messages,
    });
    messages.push({ role: 'assistant', content: response?.choices[0]?.message.content || 'no response' });
      const parsed_response = JSON.parse(response.choices[0].message.content);
      if (parsed_response.step && parsed_response.step === 'think') {
        console.log(`🧠: ${parsed_response.content}`);
        continue;
      }
      if (parsed_response.step && parsed_response.step === 'output') {
        console.log(`🤖: ${parsed_response.content}`);
        break;
      }
      if (parsed_response.step && parsed_response.step === 'action') {
        const tool = parsed_response.tool;
        const input = parsed_response.input;
        console.log(`⚙️: Tool call ${tool}: (${input})`)
        const returnedValue = Tools.getWeatherInfo(input);
        console.log(`⚙️: Tool called ${tool}: (${input}) value is ${returnedValue}`);
        messages.push({
          "role": "assistant",
          "content": JSON.stringify({ "step": "observe", content: returnedValue })
        })
        continue;
      }
    }
}
init();