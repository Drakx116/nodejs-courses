import { IMsg } from "./interfaces/IMsg";
import { IUser } from "./interfaces/IUser";

export class SocketMessage implements IMsg
{
  readonly msg: string;
  readonly roomId: string;
  readonly timestamp: number;
  readonly userId: string;
  readonly user: IUser;

  constructor(message: string, user: IUser, roomId: string) {
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
