const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");

const posts = {};

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  if (req.query.comments === "true") {
    Object.keys(posts).forEach(async (postId) => {
      const { data: comments } = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      posts[postId].comments = comments;
    });
  }

  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title: req.body.title,
  };

  res.send({});
});

app.listen(4000, () => {
  console.log("App is running on 4000");
});
