import net from "net";

export interface ServerConfigInterface
{
  /**
   * Numéro de port que le serveur doit écouter sur localhost
   */
  readonly listeningPort: number

  /**
   * Fonction à utiliser pour logger les évènements du serveur
   */
  readonly log?: (...args: Array<any>) => void

  /**
   * Fonction à utiliser pour logger les évènements d'erreur dans le serveur
   */
  readonly error?: (...args: Array<any>) => void

  /**
   * Fonction à fournir au serveur qui implémente le traitement à faire les messages réseaux reçus
   */
  readonly onData: (socket: net.Socket, data: string) => void
}
