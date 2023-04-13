const express = require("express");
const axios = require("axios").default;
const app = express();

const events = [];

app.use(express.json());

app.post("/event", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/event", event).catch(console.log);
  axios.post("http://localhost:4001/event", event).catch(console.log);
  axios.post("http://localhost:4002/event", event).catch(console.log);
  axios.post("http://localhost:4003/event", event).catch(console.log);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("App is running on 4005");
});
