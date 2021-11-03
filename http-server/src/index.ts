import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const server: http.Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 'data' : 'Success' }));
});

server.listen(8000, () => {
  console.log('Server is listening on http://localhost:8000')
});
