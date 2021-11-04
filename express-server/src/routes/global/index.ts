import express from "express";

import alive from './alive';
import hello from "./hello";
import file from "./file";

export default express.Router()
  .get('/', alive)
  .get('/hello/:name', hello)
  .get('/sources/:file', file);
