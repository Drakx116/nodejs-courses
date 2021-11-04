import express from "express";

import global from "./global";

export default express.Router()
  .use('/', global);
