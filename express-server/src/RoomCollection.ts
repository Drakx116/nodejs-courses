import { RoomCollectionInterface } from "./interfaces/RoomCollectionInterface";
import { RoomInterface } from "./interfaces/RoomInterface";

export class RoomCollection implements RoomCollectionInterface
{
  readonly all: Array<string>;
  readonly rooms: Array<RoomInterface>;

  constructor() {
    this.all = [];
    this.rooms = [];
  }

  add(room: RoomInterface): void
  {
    const alreadyExists = this.rooms.indexOf(room);

    if (alreadyExists !== 0) {
      this.rooms.push(room);
    }
  }

  del(id: string): void
  {
    const roomToDelete  = this.rooms.find(room => room.id === id);

    if (roomToDelete) {
      const index = this.rooms.indexOf(roomToDelete);
      this.rooms.splice(index, 1);
    }
  }

  get(id: string): RoomInterface | false
  {
    return this.rooms.find(room => room.id === id) || false;
  }

  getAll() {
    return this.rooms;
  }
}
