import express from "express";
import path from "path";

export default (req: express.Request, res: express.Response) => {
  // Loads the entire file in the RAM
  // const file = fs.readFileSync('./uploads/profile.png');

  // Alternative : Stream
  // const stream = fs.createReadStream('./uploads/profile.png', 'utf-8');
  // stream.pipe(res);

  res.sendFile(path.join(__dirname, '..', '..', '..', 'src', 'public', req.params.file));
};
