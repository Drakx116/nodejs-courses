import { RoomCollectionInterface } from "./interfaces/RoomCollectionInterface";
import { RoomInterface } from "./interfaces/RoomInterface";
import { Room } from "./Room";
import { SocketMessage } from "./SocketMessage";

export class RoomCollection implements RoomCollectionInterface
{
  readonly all: Array<string>;
  readonly rooms: Array<Room>;

  constructor() {
    this.all = [];
    this.rooms = [];
  }

  add(room: Room): void
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

  get(id: string): Room | false
  {
    return this.rooms.find(room => room.id === id) || false;
  }

  getAll() {
    return this.rooms;
  }

  serializeOne = (room: Room) => {
    return {
      id: room.id,
      title: room.title,
      image: room.urlImage,
      messages: this.serializeMessages(room)
    };
  }

  serializeAll() {
    const serialized: Array<any> = [];

    this.rooms.forEach(room => {
      serialized.push(this.serializeOne(room));
    });

    return serialized;
  }

  private serializeMessages = (room: Room): Array<any> => {
    const serializedMessages: Array<any> = [];

    room.getMessages().forEach(message => {
      serializedMessages.push(message.serialize());
    });

    return serializedMessages;
  };
}
