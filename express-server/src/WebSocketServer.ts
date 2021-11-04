import { Server, Socket } from 'socket.io';

import { WebSocketServerInterface } from "./interfaces/WebSocketServerInterface";
import { WebSocketServerConfigInterface } from "./interfaces/WebSocketServerConfigInterface";
import { User } from "./User";
import { SocketMessage } from "./SocketMessage";
import { UserCollection } from "./UserCollection";
import { RoomCollection } from "./RoomCollection";
import { Room } from "./Room";
import { Channel } from "./enum/channel";
import { UserInterface } from "./interfaces/UserInterface";

export class WebSocketServer implements WebSocketServerInterface {
  readonly server: Server;
  readonly onlineUsers: UserCollection;
  readonly rooms: RoomCollection;
  private _currentRoom!: Room;
  private _currentUser!: User;

  private log: (...args: any[]) => void;

  constructor(config: WebSocketServerConfigInterface) {
    this.server = new Server(config.httpServer);
    this.log = config.log || console.log;
    this.onlineUsers = new UserCollection();
    this.rooms = new RoomCollection();

    this._handleUserConnexions();
    this._initFakeData();
  }

  private _initFakeData = () => {
    const newUser = new User({ id: 'default' });
    this._currentUser = newUser;
    this.onlineUsers.add(newUser);

    const newRoom = new Room({ title: 'Landing Area' });
    this._currentRoom = newRoom;
    this.rooms.add(newRoom);
  }

  private _handleUserConnexions = () => {
    this.server.on('connection', (socket: Socket) => {
      if (!this.onlineUsers.get(socket.id)) {
        const newUser = new User({id: socket.id});
        this.onlineUsers.add(newUser);
      }

      const currentUser = this.onlineUsers.get(socket.id);
      if (currentUser) {
        this._currentUser = currentUser;
      }

      console.log('User ' + this._currentUser.id + ' joined the lobby ! Hurray !');

      // socket.on('disconnect', (reason: string) => {
      //   let label = 'User '  + user.id + ' just left the lobby. Bye Bye !'
      //   if (reason) {
      //     label += ' ' + reason;
      //   }
      //
      //   console.warn(label);
      // });

      socket.on('disconnect', (reason: string,) => {
        let label = 'User ' + this._currentUser.id + ' just left the lobby. Bye Bye !'
        if (reason) {
          label += ' ' + reason;
        }

        this.onlineUsers.del(socket.id);
        this._currentUser = this.onlineUsers.getDefault();

        console.warn(label);
      });

      socket.on('chat', (data: { message: string, id: string }) => {
        socket.emit('chat', JSON.stringify(
          new SocketMessage(data.message, this._currentUser).serialize()
        ));
      });
    });
  }
}
