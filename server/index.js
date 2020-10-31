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
  res.write(parts[0]);

  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(
    res, //send markup into res
    { end: false } //don't end once is done
  );
  stream.on("end", () => {
    res.write(parts[1]); //write html
    res.end(); //finish
  });
});

console.log("listening on port" + PORT);
app.listen(PORT);
