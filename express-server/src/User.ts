import { UserInterface } from "./interfaces/UserInterface";
import { UserCollectionInterface } from "./interfaces/UserCollectionInterface";
import { UserConfigInterface } from "./interfaces/UserConfigInterface";
import { UserCollection } from "./UserCollection";

export class User implements UserInterface
{
  id: string;
  pseudo?: string | undefined;
  imgUrl?: string | undefined;
  rooms?: string[] | undefined;
  collection: UserCollectionInterface;

  constructor(config: UserConfigInterface)
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
