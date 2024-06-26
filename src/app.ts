import express from "express";

//create express app
export const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World");
});