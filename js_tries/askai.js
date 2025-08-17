// cursor-cli.js


// =============== CONFIGURATION ===============
// 🔐 Replace with your actual OpenRouter API key
const API_KEY = "api_key";

// Optional: For OpenRouter stats (can be localhost during dev)
const SITE_URL = "http://localhost";
const SITE_NAME = "CursorCLI";

// Model to use
const MODEL = "openai/gpt-oss-20b:free";
let genId;
// =============================================

if (!API_KEY || API_KEY === "your_openrouter_api_key_here") {
  console.error("❌ Error: Please set your OpenRouter API key in the file.");
  process.exit(1);
}

// async function askAI(prompt) {
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "HTTP-Referer": SITE_URL,
//         "X-Title": SITE_NAME,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: MODEL,
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         temperature: 0.7,
//       }),
//     }
//   );

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error("❌ API Error:", errorText);
//     return;
//   }

//   const reader = response.body?.getReader();
//   if (!reader) {
//     console.error("❌ No stream available");
//     return;
//   }

//   let buffer = "";

//   console.log("\n🤖 AI Response:\n");

//   try {
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       buffer += new TextDecoder().decode(value);
//       const lines = buffer.split("\n");
//       buffer = lines.pop() || "";

//       for (const line of lines) {
//         if (line.startsWith("data: ")) {
//           const dataStr = line.slice(6).trim();
//           if (dataStr === "[DONE]") continue;

//           try {
//             const data = JSON.parse(dataStr);
//             const token = data.choices[0]?.delta?.content;
//             if (token) {
//               process.stdout.write(token);
//             }
//           } catch (e) {
//             // Ignore malformed JSON
//           }
//         }
//       }
//     }
//     console.log("\n\n✅ Done.\n");
//   } catch (err) {
//     console.error("❌ Stream error:", err.message);
//   } finally {
//     reader.releaseLock();
//   }
// }
// async function askAI(prompt) {
//   try {
//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`,
//         'HTTP-Referer': SITE_URL,
//         'X-Title': SITE_NAME,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: MODEL,
//         messages: [
//           {
//             role: 'user',
//             content: prompt,
//           },
//         ],
//         temperature: 0.7,
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ API Error:', errorText);
//       return;
//     }

//     const reader = response.body?.getReader();
//     if (!reader) {
//       console.error('❌ No stream available');
//       return;
//     }

//     let buffer = '';

//     console.log('\n🤖 AI Response:\n');

//     try {
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         buffer += new TextDecoder().decode(value);
//         const lines = buffer.split('\n');
//         buffer = lines.pop() || '';

//         for (const line of lines) {
//           if (line.startsWith(' ')) {
//             const dataStr = line.slice(6).trim();
//             if (dataStr === '[DONE]') continue;

//             try {
//               const data = JSON.parse(dataStr);
//               const token = data.choices[0]?.delta?.content;
//               if (token) {
//                 process.stdout.write(token);
//               }
//             } catch (e) {
//               console.error('⚠️ Malformed JSON chunk:', e.message);
//             }
//           }
//         }
//       }
//       console.log('\n\n✅ Done.\n');
//     } catch (err) {
//       console.error('❌ Stream error:', err.message);
//     } finally {
//       reader.releaseLock();
//     }
//   } catch (err) {
//     console.error('❌ Unexpected error:', err.message);
//   }
// }
async function askAi(prompt) {
    const API_KEY =
        "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";
    const MODEL = "openai/gpt-oss-20b:free";
    try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions"
            , {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'HTTP-Referer': 'form ts app',
                    'X-Title':'form ts app',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        {
                            role: 'user',
                            content:prompt,
                        }
                    ],
                    temperature:0.7,
                })
            });
      if (response.ok) {
        const obj = await response.json().then(x => x);
        const mes = obj.choices[0].message;
            console.log("response is", obj);
            console.log("response is message", mes);
        }
    } catch (error) {
        console.log('error is ', error);
    }
}
async function askAiStream(prompt){
  if (!API_KEY || API_KEY === "") {
    console.error("❌ Missing API key. Please set your OpenRouter API key.");
    return;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": "form ts app", // Optional
      "X-Title": "form ts app", // Optional
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      stream: true, // 🔥 Enable streaming
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ API Error:", response.status, errorText);
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    console.error("❌ Cannot read streaming response");
    return;
  }

  let buffer = "";
  let fullResponse = "";

  console.log("🤖 AI Streaming Response:\n");

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the chunk and append to buffer
      buffer += new TextDecoder().decode(value);

      // Split by newline to process each SSE event
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6).trim(); // Remove "data: " prefix

          if (dataStr === "[DONE]") {
            console.log("\n\n✅ Streaming completed.");
            return;
          }

          try {
            const data = JSON.parse(dataStr);
             genId = data.id;
            const token = data.choices[0]?.delta?.content;

            if (token) {
              process.stdout.write(token); // Print token immediately
              fullResponse += token;
            }
          } catch (e) {
            // Ignore malformed JSON (e.g. heartbeats or ping events)
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Stream reading error:", error);
  } finally {
    reader.releaseLock();
  }

  console.log("\n\n📥 Final Response:\n", fullResponse);
}
function showIntro() {
  console.log(`
🚀 Welcome to Cursor-like CLI Demo (powered by OpenRouter)
────────────────────────────────────────────────────────────
Ask anything or type 'exit' to quit.
Example prompts:
  • "Write a TypeScript function to reverse a string"
  • "Explain how closures work in JavaScript"
  • "Create a CLI in Node.js that fetches data"
`);
}

async function main() {
  showIntro();

  const { createInterface } = await import("readline");
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // function promptUser() {
  //   rl.question("\n💬 Enter your prompt: ", (input) => {
  //     const trimmed = input.trim();

  //     if (trimmed.toLowerCase() === "exit") {
  //       console.log("👋 Goodbye!");
  //       rl.close();
  //       return;
  //     }

  //     if (trimmed) {
  //       askAi(trimmed);
  //     } else {
  //       console.log("⚠️ Please enter a valid prompt.");
  //     }

  //     // Continue loop
  //     promptUser();
  //   });
  // }

  // promptUser();
  await askAiStream("Hi who are you.");
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(2000);
  const generation = await fetch(
  `https://openrouter.ai/api/v1/generation?id=${genId}`,
  { headers: {
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": "form ts app", // Optional
      "X-Title": "form ts app", // Optional
      "Content-Type": "application/json",
    }, },
  );
  console.log("getting stats");
  const stats = await generation.json().then(x=>x);
  console.log('gen id is', genId);
  console.log('stats are', stats);
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err.message);
});
