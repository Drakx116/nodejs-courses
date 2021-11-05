import { Server as SocketIOServer } from 'socket.io';
import { IUserCollection } from "./IUserCollection";
import { IRoomCollection } from "./IRoomCollection";

export interface IWSServer
{
  /**
   * Instance du serveur renvoyé par Socket.IO
   */
  readonly server: SocketIOServer

  /**
   * Liste des utilisateurs en ligne
   */
  readonly onlineUsers: IUserCollection

  /**
   * Liste des salons connus du serveur
   */
  readonly rooms: IRoomCollection;
}
