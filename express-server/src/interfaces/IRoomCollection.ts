import { IRoom } from "./IRoom";

export interface IRoomCollection
{
  /**
   * Liste des identifiants des salons
   */
  readonly all: Array<string>

  /**
   * Récupération des données d'un salon dont l'identifiant est `id`
   */
  get (id: string): IRoom | false

  /**
   * Ajoute un salon aux salons connus de cette collection
   */
  add (room: IRoom): void

  /**
   * Supprime de cette collection un salon avec l'identifiant `id` donné
   */
  del (id: string): void
}
