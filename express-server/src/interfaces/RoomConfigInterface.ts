import { UserCollectionInterface } from "./UserCollectionInterface";

export interface RoomConfigInterface
{
  /**
   * Identifiant du salon
   */
  readonly id?: string

  /**
   * Intitulé du salon
   */
  readonly title?: string

  /**
   * Identifiant de l'éventuel administrateur du salon.
   * (S'il n'y a pas d'administrateur sur ce salon, on est sur un salon public)
   */
  readonly adminId?: string

  /**
   * URL éventuelle de l'image représentant le salon
   */
  readonly urlImage?: string

  /**
   * Collection des utilisateurs utilisée par le Web Socket Server
   */
  readonly usersCollection?: UserCollectionInterface

  /**
   * Liste des identifiants des utilisateurs qui sont initialement joint au salon courant
   */
  readonly prejoinedUsers?: Array<string>
}
