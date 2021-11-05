import { SocketMessageInterface } from "./interfaces/SocketMessageInterface";
import { UserInterface } from "./interfaces/UserInterface";

export class SocketMessage implements SocketMessageInterface
{
  readonly msg: string;
  readonly roomId: string;
  readonly timestamp: number;
  readonly userId: string;
  readonly user: UserInterface;

  constructor(message: string, user: UserInterface, roomId: string) {
    this.msg = message;
    this.user = user;
    this.userId = user.id;

    this.roomId = roomId || "default";

    this.timestamp = Date.now();
  }

  public serialize() {
    return {
      message: this.msg,
      room: this.roomId,
      timestamp: this.timestamp,
      user: {
        id: this.user.id,
        pseudo: this.user.pseudo,
        avatar: this.user.imgUrl
      }
    }
  }
}
