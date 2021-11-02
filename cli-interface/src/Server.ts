import net from 'net';
import { ServerInterface } from './interfaces/ServerInterface';
import { ServerConfigInterface } from "./interfaces/ServerConfigInterface";

export class Server implements ServerInterface
{
  private instance: net.Server;
  readonly listeningPort: number;

  constructor(config: ServerConfigInterface) {
    this.listeningPort = config.listeningPort;
    this.onData = config.onData;

    this.instance = net.createServer();
    this.instance.on('error', error => console.log(error));
    this.instance.on('connection', socket => {
      socket.on('data', data => this.onData(socket, data.toString()))
    });
  }

  onData: (socket: net.Socket, data: string) => void;

  listen(): void {
    this.instance.listen(this.listeningPort);
  }

  close(): void {
    this.instance.close(() => console.log('Connexion closed.'))
  }

  readonly log = (...args: Array<any>) => {}
  readonly error = (...args: Array<any>) => {}
}
