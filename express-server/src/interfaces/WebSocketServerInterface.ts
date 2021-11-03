import { Server as SocketIOServer } from 'socket.io';

export interface WebSocketServerInterface
{
  /**
   * Instance du serveur renvoyé par Socket.IO
   */
  readonly server: SocketIOServer
}
