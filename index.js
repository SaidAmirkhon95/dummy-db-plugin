const { parentPort } = require("worker_threads");

parentPort.on("message", (msg) => {
  if (msg.type !== "request") return;

  if (msg.action === "command") {
    const { commandId } = msg.payload;

    if (commandId === "dummy.scan") {
      const csv = "id,name,email\n1,A,a@example.com\n2,B,b@example.com\n3,C,c@example.com";
      parentPort.postMessage({
        type: "response",
        id: msg.id,
        payload: { format: "csv", data: csv }
      });
      return;
    }

    parentPort.postMessage({
      type: "response",
      id: msg.id,
      error: "Unknown commandId: " + commandId
    });
  }
});
