import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function runWorker(taskName: string, iterations: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, "worker.js"), {
      workerData: { taskName, iterations },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code != 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
async function main() {
  console.log(`Starting worker on.... ${new Date().toLocaleTimeString()}`);
  const results = await Promise.all([
    runWorker("Task A", 1e7),
    runWorker("Task B", 2e7),
    runWorker("Task C", 3e7),
    runWorker("Task D", 4e7),
    runWorker("Task E", 5e7),
    runWorker("Task E", 6e7),
    runWorker("Task G", 7e7),
    runWorker("Task H", 8e7),
    runWorker("Task I", 9e7),
    runWorker("Task J", 10e7),
    runWorker("Task K", 11e7),
    runWorker("Task L", 12e7),
    runWorker("Task M", 13e7),
    runWorker("Task N", 14e7),
    runWorker("Task O", 15e7),
    runWorker("Task P", 16e7),
    runWorker("Task Q", 17e7),
  ]);
  console.log("Results: ", results);
  console.log(`Completed worker on.... ${new Date().toLocaleTimeString()}`);
}

main().catch((err) => console.error(err));
