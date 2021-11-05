export interface IRoom
{
  /**
   * Identifiant du salon
   */
  readonly id: string

  /**
   * Intitulé du salon
   */
  title: string

  /**
   * Liste des identifiants des users qui ont joint ce salon
   */
  readonly joinedUsers: Array<string>

  /**
   * Le salon est-il public?
   */
  readonly public: boolean

  /**
   * Si le salon est privé, identifiant de l'administrateur du salon.
   * Si le salon est public -> FALSE
   */
  readonly adminId: string | false

  /**
   * URL éventuelle de l'image représentant le salon
   */
  readonly urlImage: string | false

  /**
   * Joindre l'utilisateur d'identifiant `userId` à ce salon
   */
  joinUser (userId: string): boolean

  /**
   * Retirer l'utilisateur d'identifiant `userId` de ce salon
   */
  leaveUser (userId: string): void
}
