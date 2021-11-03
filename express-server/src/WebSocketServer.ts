import { Server } from 'socket.io';

import { WebSocketServerInterface } from "./interfaces/WebSocketServerInterface";
import { WebSocketServerConfigInterface } from "./interfaces/WebSocketServerConfigInterface";

export class WebSocketServer implements WebSocketServerInterface
{
  readonly server: Server;
  private log: (...args: any[]) => void;

  constructor(config: WebSocketServerConfigInterface) {
    this.server = new Server(config.httpServer);
    this.log = config.log || console.log;
  }
}
