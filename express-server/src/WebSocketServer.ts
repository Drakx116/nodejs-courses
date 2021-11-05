import { Server, Socket } from 'socket.io';

import { IWSServer } from "./interfaces/IWSServer";
import { IWSServerConfig } from "./interfaces/IWSServerConfig";
import { User } from "./User";
import { SocketMessage } from "./SocketMessage";
import { UserCollection } from "./UserCollection";
import { RoomCollection } from "./RoomCollection";
import { Room } from "./Room";
import { Channel } from "./enum/channel";

export class WebSocketServer implements IWSServer {
  readonly server: Server;
  readonly onlineUsers: UserCollection;
  readonly rooms: RoomCollection;
  private _currentRoom!: Room;
  private _currentUser!: User;

  private log: (...args: any[]) => void;

  constructor(config: IWSServerConfig) {
    this.server = new Server(config.httpServer);
    this.log = config.log || console.log;
    this.onlineUsers = new UserCollection();
    this.rooms = new RoomCollection();

    this._initFakeData();
    this._handleUserConnexions();
  }

  private _initFakeData = () => {
    const newUser = new User({ id: 'default' });
    this._currentUser = newUser;
    this.onlineUsers.add(newUser);

    const symfonyRoom = new Room({ title: 'Symfony', urlImage: 'symfony.png' });
    const reactRoom = new Room({ title: 'React', urlImage: 'react.png' });
    this._currentRoom = symfonyRoom;
    this.rooms.add(symfonyRoom);
    this.rooms.add(reactRoom);
  }

  private _handleUserConnexions = () => {
    this.server.on('connection', (socket: Socket) =>
    {
      // Creates User instance on first connexion
      if (!this.onlineUsers.get(socket.id)) {
        const newUser = new User({id: socket.id});
        this.onlineUsers.add(newUser);
      }

      const currentUser = this.onlineUsers.get(socket.id);
      if (currentUser) {
        this._currentUser = currentUser;
      }

      console.log('User ' + this._currentUser.id + ' joined the lobby ! Hurray !');

      // Client initialization
      socket.emit(Channel.rooms, JSON.stringify(this.rooms.serializeAll()));

      socket.emit(Channel.refresh, JSON.stringify(this.rooms.serializeOne(this._currentRoom)));

      // Client events
      socket.on(Channel.disconnect, (reason: string,) => {
        let label = 'User ' + this._currentUser.id + ' just left the lobby. Bye Bye !'
        if (reason) {
          label += ' ' + reason;
        }

        this.onlineUsers.del(socket.id);
        this._currentUser = this.onlineUsers.getDefault();

        console.warn(label);
      });

      socket.on(Channel.incomingMessage, (data: { message: string, socketId: string, roomId: string }) => {
        const { message, socketId, roomId } = data;

        const user = this.onlineUsers.get(socketId);
        const room = this.rooms.get(roomId);

        if (!(user && room)) {
          return;
        }

        const socketMessage = new SocketMessage(message, user, roomId);
        room.addMessage(socketMessage);

        // Refreshes channel messages for every online user
        socket.emit(Channel.refresh, JSON.stringify(this.rooms.serializeOne(room)));
        socket.broadcast.emit(Channel.refresh, JSON.stringify(this.rooms.serializeOne(room)));
      });

      socket.on(Channel.roomUpdate, (roomId: string) => {
        const room = this.rooms.get(roomId);
        if (!room) {
          return;
        }

        this._currentRoom = room;
        socket.emit(Channel.refresh, JSON.stringify(this.rooms.serializeOne(this._currentRoom)));
      });
    });
  }
}
