const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");

const commentsByPostId = {};

app.use(cors());
app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content: req.body.content });
  commentsByPostId[req.params.id] = comments;
  res.send({});
});

app.listen(4001, () => {
  console.log("App is running on 4001");
});
