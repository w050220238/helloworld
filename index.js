"use strict";

const cluster = require("cluster");
const express = require("express");
const cpuCount = require("os").cpus().length;

const port = 3000;

if (cluster.isMaster && process.env.mode !== "debug") {
    
    for (let i = 0; i < cpuCount; i ++) {
        cluster.fork();
    }

    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online.`);
    })

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died.`);
        cluster.fork();
    })

} else {
    const app = express();
    app.get("/hello", (req, res) => {
        res.status(200).end("Hello World!");
    });

    app.listen(port);
    console.log(`Listening on port ${port}`);
}