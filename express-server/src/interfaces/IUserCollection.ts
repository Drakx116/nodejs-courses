import { IUser } from "./IUser";

export interface IUserCollection extends Iterator<IUser>
{
  /**
   * Liste des identifiants des utilisateurs
   */
  readonly all: Array<string>

  /**
   * Récupération des données d'un utilisateur dont l'identifiant est `id`
   */
  get (id: string): IUser | false

  /**
   * Ajoute un utilisateur aux utilisateurs connus de cette collection
   */
  add (user: IUser): void

  /**
   * Supprime de cette collection un utilisateur avec l'identifiant `id` donné
   */
  del (id: string): void
}
