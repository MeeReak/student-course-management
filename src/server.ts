import express from "express";

//create express app
const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World");
});

//listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000!!");
});
