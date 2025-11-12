import { parentPort, workerData,threadId } from "worker_threads";

if (parentPort) {
  const { taskName, iterations } = workerData;
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += i;
  }
  parentPort.postMessage(`Task "${taskName}" completed with thread ${threadId}. Sum: ${sum}`);
}
