import { Server as SocketIOServer } from 'socket.io';
import { UserCollectionInterface } from "./UserCollectionInterface";
import { RoomCollectionInterface } from "./RoomCollectionInterface";

export interface WebSocketServerInterface
{
  /**
   * Instance du serveur renvoyé par Socket.IO
   */
  readonly server: SocketIOServer

  /**
   * Liste des utilisateurs en ligne
   */
  readonly onlineUsers: UserCollectionInterface

  /**
   * Liste des salons connus du serveur
   */
  readonly rooms: RoomCollectionInterface;
}
