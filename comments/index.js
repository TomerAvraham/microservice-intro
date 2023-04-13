const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");

const commentsByPostId = {};
// 432y : [{  }]

app.use(cors());
app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content: req.body.content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/event", {
    type: "CommentCreated",
    data: {
      postId: req.params.id,
      id,
      content: req.body.content,
      status: "pending",
    },
  });

  res.send({});
});

app.post("/event", async (req, res) => {
  const { type, data } = req.body;
  console.log(`Received event type: ${type}`);

  if (type === "CommentModerated") {
    const { postId, id, content, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://localhost:4005/event", {
      type: "CommentUpdated",
      data: {
        postId,
        id,
        content,
        status,
      },
    });
  }

  res.send();
});

app.listen(4001, () => {
  console.log("App is running on 4001");
});
