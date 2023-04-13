const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const posts = {};
// jkh9iud : { id: jkh9iud, title: Post 1#, comment: [] }

function handleEvent(event) {
  const { data, type } = event;

  if (type === "PostCreated") {
    posts[data.id] = {
      id: data.id,
      title: data.title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { postId, id, content, status } = data;
    posts[postId].comments.push({
      id,
      content,
      status,
    });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
}

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/event", (req, res) => {
  const event = req.body;
  console.log(`Received event type: ${event.type}`);
  handleEvent(event);
  res.send("OK");
});

app.listen(4002, async () => {
  console.log("App is running on 4002");
  try {
    const { data } = await axios.get("http://localhost:4005/events");

    for (const event of data) {
      console.log(`Process event`);
      handleEvent(event);
    }
  } catch (error) {
    console.log(error.message);
  }
});
