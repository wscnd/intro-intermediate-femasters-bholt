import { ServerLocation } from "@reach/router";
import express from "express";
import fs from "fs";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("Render");

const app = express();

app.use("/dist", express.static("dist/"));

app.use((req, res) => {
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  res.send(parts[0] + renderToNodeStream(reactMarkup) + parts[1]);

  res.end();
});

console.log("listening on port" + PORT);
app.listen(PORT);
