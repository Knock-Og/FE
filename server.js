const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  setInterval(() => {
    res.write(`뭔가가 변경됐어 !`);
  }, 2000);
});

app.listen(4000, () => {
  console.log("SSE server listening on port 4000");
});
