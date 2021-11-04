import { v4 as uuid4 } from 'uuid';

import { RoomInterface } from "./interfaces/RoomInterface";
import { RoomConfigInterface } from "./interfaces/RoomConfigInterface";

export class Room implements RoomInterface
{
  readonly adminId: string | false;
  readonly id: string;
  readonly joinedUsers: Array<string>;
  readonly public: boolean;
  title: string;
  readonly urlImage: string | false;

  constructor(config: RoomConfigInterface, isPublic: boolean = true) {
    this.id = uuid4();
    this.joinedUsers = [];
    this.public = isPublic;
    this.title = config.title || "Dummy Server " + uuid4();
    this.urlImage = config.urlImage || false;
    this.adminId = config.adminId || false;
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

}
