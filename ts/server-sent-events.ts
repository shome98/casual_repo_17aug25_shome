import http from "http";
const port: number = 8766;
const server = http.createServer((req, res) => {
    if (req.url === "/events") {
        console.log("streaming started");
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    const interval = setInterval(() => {
      res.write(`data: Hello at ${Date.now()} as server sent events\n\n`);
    }, 2000);
    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } else {
    res.writeHead(200).end("Server is up and running");
  }
});
server.listen(port, () =>
  console.log(`Sever is running at http://localhost:${port}`)
);
