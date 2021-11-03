import { SocketMessageInterface } from "./interfaces/SocketMessageInterface";

export class SocketMessage implements SocketMessageInterface
{
  readonly msg: string;
  readonly roomId: string;
  readonly timestamp: number;
  readonly userId: string;

  constructor(message: string, roomId: string, userId: string) {
    this.msg = message;
    this.roomId = roomId;
    this.userId = userId;
    this.timestamp = Date.now();
  }
}
