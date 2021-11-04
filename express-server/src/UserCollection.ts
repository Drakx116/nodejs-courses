import { User } from "./User";
import { UserCollectionInterface } from "./interfaces/UserCollectionInterface";
import { UserInterface } from "./interfaces/UserInterface";

export class UserCollection implements UserCollectionInterface
{
  readonly users: Array<User>;

  constructor()
  {
    this.users = [];
  }

  add(user: UserInterface): void {
    const alreadyExists = this.users.indexOf(user);

    if (alreadyExists !== 0) {
      this.users.push(user);
    }
  }

  del(id: string): void {
    const userToDelete  = this.users.find(user => user.id === id);

    if (userToDelete) {
      const index = this.users.indexOf(userToDelete);
      this.users.splice(index, 1);
    }
  }

  get(id: string): UserInterface | false
  {
    return this.users.find(user => user.id === id) || false;
  }

  public getDefault(): UserInterface {
    return this.users[0];
  }

  public next = (): any => {};

  public get all(): Array<string> {
    return this.users.map(user => user.id);
  }

  getAll() {
    return this.users;
  }
}
