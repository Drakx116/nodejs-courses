import { IUserCollection } from "./IUserCollection";

export interface IUserConfig
{
  /**
   * Identifiant de l'utilisateur
   */
  readonly id: string

  /**
   * Pseudo éventuel de l'utilisateur
   */
  readonly pseudo?: string

  /**
   * Url de l'éventuelle image de l'utilisateur
   */
  readonly imgUrl?: string

  /**
   * Collection à l'intérieur de laquelle est enregistré l'utilisateur
   */
  readonly collection?: IUserCollection
}
