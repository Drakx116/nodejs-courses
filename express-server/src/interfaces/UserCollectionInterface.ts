import { UserInterface } from "./UserInterface";

export interface UserCollectionInterface extends Iterator<UserInterface>
{
  /**
   * Liste des identifiants des utilisateurs
   */
  readonly all: Array<string>

  /**
   * Récupération des données d'un utilisateur dont l'identifiant est `id`
   */
  get (id: string): UserInterface | false

  /**
   * Ajoute un utilisateur aux utilisateurs connus de cette collection
   */
  add (user: UserInterface): void

  /**
   * Supprime de cette collection un utilisateur avec l'identifiant `id` donné
   */
  del (id: string): void
}
