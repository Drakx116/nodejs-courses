export interface IClientConfig
{
  /**
   * Adresse du serveur à pinguer
   */
  readonly address: string

  /**
   * Port du serveur à pinguer
   */
  readonly port: number

  /**
   * Méthode custom optionnelle de log (Idem que serveur)
   */
  readonly log?: (...args: Array<any>) => void

  /**
   * Méthode custom optionnelle d'erreur (Idem que serveur)
   */
  readonly error?: (...args: Array<any>) => void
}
