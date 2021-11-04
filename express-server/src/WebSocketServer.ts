import { Server, Socket } from 'socket.io';

import { WebSocketServerInterface } from "./interfaces/WebSocketServerInterface";
import { WebSocketServerConfigInterface } from "./interfaces/WebSocketServerConfigInterface";
import { User } from "./User";
import { SocketMessage } from "./SocketMessage";
import { UserCollection } from "./UserCollection";
import { UserCollectionInterface } from "./interfaces/UserCollectionInterface";
import { RoomCollectionInterface } from "./interfaces/RoomCollectionInterface";

export class WebSocketServer implements WebSocketServerInterface
{
  readonly server: Server;
  readonly onlineUsers: UserCollectionInterface;
  readonly rooms: RoomCollectionInterface;
  private log: (...args: any[]) => void;

  constructor(config: WebSocketServerConfigInterface) {
    this.server = new Server(config.httpServer);
    this.log = config.log || console.log;
    this.onlineUsers = new UserCollection();
    this.rooms = [];

    this.handleUserConnexions();
  }

  private handleUserConnexions = () => {
    this.server.on('connection', (socket: Socket) =>
    {
      const user: User = new User({
        id: socket.id,
        collection: new UserCollection()
      });

      console.log('User ' + user.id + ' joined the lobby ! Hurray !');

      socket.on('disconnect', (reason: string) => {
        let label = 'User '  + user.id + ' just left the lobby. Bye Bye !'
        if (reason) {
          label += ' ' + reason;
        }

        console.warn(label);
      });

      socket.on('chat', (data: { message: string, id: string }) => {
        socket.emit('chat', new SocketMessage(data.message, user).serialize());
      });
    });
  }
}
