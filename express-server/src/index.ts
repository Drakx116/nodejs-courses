import express from "express";
import http from "http";
import path from 'path';
import { Socket } from "socket.io";
import { User } from "./User";
import { UserCollection } from "./UserCollection";
import { randomUUID } from "crypto";
import { WebSocketServer } from "./WebSocketServer";

const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketServer = new WebSocketServer({ httpServer}).server;

const collection = new UserCollection();

const port = 8000;

expressServer.get('/', (req: express.Request, res: express.Response) => {
  res.json({ 'data': 'Success' });
});

expressServer.get('/hello/:name', (req: express.Request, res: express.Response) => {
  res.statusCode = 200;
  res.json({ 'data': 'Hello ' + req.params.name });
});

expressServer.get('/sources/:file', (req: express.Request, res: express.Response) => {
  // Loads the entire file in the RAM
  // const file = fs.readFileSync('./uploads/profile.png');

  // Alternative : Stream
  // const stream = fs.createReadStream('./uploads/profile.png', 'utf-8');
  // stream.pipe(res);

  res.sendFile(path.join(__dirname, '..', 'src', 'public', req.params.file));
});

socketServer.on('connection', (socket: Socket) =>
{
  const user: User = new User({
    id: randomUUID({}).toString(),
    collection: collection
  });

  console.log('User ' + user.id + ' joined the lobby ! Hurray !');

  socket.on('disconnect', (reason: string) => {
    let label = 'User '  + user.id + ' just left the lobby. Bye Bye !'
    if (reason) {
      label += ' ' + reason;
    }

    console.warn(label);
  });

  socket.on('chat', (message: string) => {
    socket.emit('chat', message);
  });
});

httpServer.listen(port, () => {
  console.log('Server is listening on http://localhost:8000 \r\n');
});
