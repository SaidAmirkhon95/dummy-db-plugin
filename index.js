const { parentPort } = require("worker_threads");

// Fake rows for demo purposes
const dummyRows = [
  { id: 1, name: "A", email: "a@example.com" },
  { id: 2, name: "B", email: "b@example.com" },
  { id: 3, name: "C", email: "c@example.com" }
];

parentPort.on("message", (msg) => {
  if (msg.action === "scan") {
    parentPort.postMessage({ rows: dummyRows });
  } else if (msg.action === "metadata") {
    parentPort.postMessage({
      tables: ["users", "orders"],
      description: "Dummy database plugin"
    });
  } else {
    parentPort.postMessage({ error: `Unknown action: ${msg.action}` });
  }
});
