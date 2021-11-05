import { IUser } from "./interfaces/IUser";
import { IUserCollection } from "./interfaces/IUserCollection";
import { IUserConfig } from "./interfaces/IUserConfig";
import { UserCollection } from "./UserCollection";

export class User implements IUser
{
  id: string;
  pseudo?: string | undefined;
  imgUrl?: string | undefined;
  rooms?: string[] | undefined;
  collection: IUserCollection;

  constructor(config: IUserConfig)
  {
    this.id = config.id;
    this.collection = config.collection || new UserCollection();
    this.pseudo = config.pseudo;

    this.collection.add(this);
  }

  joinRoom(roomId: string): void
  {
    this.rooms?.push(roomId);
  }

  leaveRoom(roomId: string): void
  {
    const index  = this.rooms?.indexOf(roomId);
    this.rooms?.slice(index, 1);
  }
}
