const api_key="";
const model="openai/gpt-oss-20b:free";
async function askAi(prompt:string) {
    try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions"
            , {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${api_key}`,
                    'HTTP-Referer': 'form ts app',
                    'X-Title':'form ts app',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    model: model,
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
        console.log(`error is `,error);
    }
}

async function getStats(genId:string){
    const generation = await fetch(
  `https://openrouter.ai/api/v1/generation?id=${genId}`,
  { headers: {
      Authorization: `Bearer ${api_key}`,
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

async function askAiStream(prompt:string){
    const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions"
            , {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${api_key}`,
                    'HTTP-Referer': 'form ts app',
                    'X-Title':'form ts app',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'user',
                            content:prompt,
                        }
                    ],
                    temperature:0.7,
                    stream:true,
                })
            });

    if(!response.ok){
        const errorText=await response.text();
        console.log(`Api error: ${response.status} ${errorText}`)
    }

    const reader=response.body?.getReader();
    if(!reader){
        console.error("can not read streaming response");
        return;
    }

    let buffer="";
    let fullResponse="";

    try {
        while(true){
            const {done,value}=await reader.read();
            if(done) break;
            buffer+=new TextDecoder().decode(value);
            const lines=buffer.split("\n");
            buffer+=lines.pop||"";
            for (const line in lines){
                
            }
            
        }
    } catch (error) {
        console.error("reader error ",error);
    }
}
async function main(){
    console.log("main called");
    //await askAi("Hi who are you?");
    await getStats("gen-1755501053-KUcCxflemW43SUjUUgPC");
}
main().catch((err) => {
  console.error("❌ Unexpected error:", err.message);
});