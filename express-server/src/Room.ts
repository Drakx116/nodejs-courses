import { v4 as uuid4 } from 'uuid';

import { RoomInterface } from "./interfaces/RoomInterface";
import { RoomConfigInterface } from "./interfaces/RoomConfigInterface";
import { SocketMessage } from "./SocketMessage";

export class Room implements RoomInterface
{
  readonly adminId: string | false;
  readonly id: string;
  readonly joinedUsers: Array<string>;
  readonly public: boolean;
  title: string;
  readonly urlImage: string | false;
  private readonly messages: Array<SocketMessage>;

  constructor(config: RoomConfigInterface, isPublic: boolean = true) {
    this.id = uuid4();
    this.joinedUsers = [];
    this.public = isPublic;
    this.title = config.title || "Dummy Server " + uuid4();
    this.urlImage = config.urlImage || false;
    this.adminId = config.adminId || false;
    this.messages = [];
  }

  joinUser(userId: string): boolean
  {
      const index = this.joinedUsers.indexOf(userId);

      if (!index) {
        this.joinedUsers.push(userId);
      }

      return true;
  }

  leaveUser(userId: string): void
  {
    const index = this.joinedUsers.indexOf(userId);

    if (index) {
      this.joinedUsers.splice(index, 1);
    }
  }

  getMessages = () => {
    return this.messages;
  }

  addMessage = (message: SocketMessage) => {
    this.messages.push(message);
  }
}
