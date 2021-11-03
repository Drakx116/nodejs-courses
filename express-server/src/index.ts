import express from "express";
import http from "http";
import path from 'path';
import { Server, Socket } from "socket.io";

const server = express();
const httpServer = http.createServer(server);
const socketServer = new Server(httpServer);

const port = 8000;

server.get('/', (req: express.Request, res: express.Response) => {
  res.json({ 'data': 'Success' });
});

server.get('/hello/:name', (req: express.Request, res: express.Response) => {
  res.statusCode = 200;
  res.json({ 'data': 'Hello ' + req.params.name });
});

server.get('/sources/:file', (req: express.Request, res: express.Response) => {
  // Loads the entire file in the RAM
  // const file = fs.readFileSync('./uploads/profile.png');

  // Alternative : Stream
  // const stream = fs.createReadStream('./uploads/profile.png', 'utf-8');
  // stream.pipe(res);

  res.sendFile(path.join(__dirname, '..', 'src', 'public', req.params.file));
});

socketServer.on('connection', (socket: Socket) => {
  console.log('A user is now logged.');

  socket.on('disconnect', reason => {
    let message = 'A user has been disconnected.'
    if (reason) {
      message += ' ' + reason;
    }

    console.log(message);
  });

  socket.on('chat', (message: string) => {
    socket.emit('chat', message);
  });
});

httpServer.listen(port, () => {
  console.log('Server is listening on http://localhost:8000');
});
