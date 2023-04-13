const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/event", async (req, res) => {
  const { type, data } = req.body;
  console.log(`Received event type: ${type}`);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/event", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }
});

app.listen(4003, () => {
  console.log("App is running on 4003");
});
