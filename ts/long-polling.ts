import http from 'http';
const port: number = 8765;
const server = http.createServer((req, res) => {
    if (req.url === '/poll') {
        setTimeout(() => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Hello at ${new Date().toISOString()}` }));
        }, 5000);
    }
    else {
        res.writeHead(200).end("Server is up and running");
    }
});
server.listen(port, () => console.log(`Sever is running at http://localhost:${port}`));
