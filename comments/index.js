const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");

const commentsByPostId = {};

app.use(cors());
app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content: req.body.content });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/event", {
    type: "CommentCreated",
    data: {
      postId: req.params.id,
      id,
      content: req.body.content,
    },
  });

  res.send({});
});

app.post("/event", (req, res) => {
  const event = req.body;
  console.log(`Received event type: ${event.type}`);
  res.send();
});

app.listen(4001, () => {
  console.log("App is running on 4001");
});
