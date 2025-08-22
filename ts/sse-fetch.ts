async function fetchSSE() {
  const response = await fetch("http://localhost:8766/events", {
    headers: {
      Accept: "text/event-stream",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const reader = response
    .body!.pipeThrough(new TextDecoderStream())
    .getReader();
  let buffer = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += value;
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; 
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.substring(5); 
          console.log("Received SSE data:", data);
        }
      }
    }
  } catch (error) {
    console.error("Error reading stream:", error);
  }
}

fetchSSE().then().catch(error=>console.log(error));
