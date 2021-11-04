import { RoomInterface } from "./RoomInterface";

export interface RoomCollectionInterface
{
  /**
   * Liste des identifiants des salons
   */
  readonly all: Array<string>

  /**
   * Récupération des données d'un salon dont l'identifiant est `id`
   */
  get (id: string): RoomInterface | false

  /**
   * Ajoute un salon aux salons connus de cette collection
   */
  add (room: RoomInterface): void

  /**
   * Supprime de cette collection un salon avec l'identifiant `id` donné
   */
  del (id: string): void
}
