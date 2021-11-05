import { IUserCollection } from "./IUserCollection";

export interface IUser
{
  /**
   * Identifiant de l'utilisateur
   */
  readonly id: string

  /**
   * Pseudo éventuel de l'utilisateur
   */
  pseudo?: string

  /**
   * Url de l'éventuelle image de l'utilisateur
   */
  imgUrl?: string

  /**
   * Collection à l'intérieur de laquelle est enregistré l'utilisateur
   */
  collection: IUserCollection

  /**
   * Liste des identifiants des salons que l'utilisateur à joint
   */
  rooms?: Array<string>

  /**
   * Méthode permettant d'inclure l'utilisateur dans un salon
   */
  joinRoom (roomId: string): void

  /**
   * Méthode permettant à un utilisateur de quitter un salon
   */
  leaveRoom (roomId: string): void
}
