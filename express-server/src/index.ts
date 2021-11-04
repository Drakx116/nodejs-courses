import express from "express";
import http from "http";

import { WebSocketServer } from "./WebSocketServer";
import router from './routes';

const httpServer = http.createServer(express().use(router));
const webSocketServer = new WebSocketServer({ httpServer});

httpServer.listen(8000, () => {
  console.log('Server is listening on http://localhost:8000 \r\n');
});
