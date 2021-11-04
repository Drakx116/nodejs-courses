import express from "express";

export default (req: express.Request, res: express.Response) => {
  res.json({ 'data': 'Success' });
};
