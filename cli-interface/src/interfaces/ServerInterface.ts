import net from "net";

export interface ServerInterface {
  /**
   * Numéro de port sur lequel écoutera le serveur
   * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
   */
  readonly listeningPort: number
  /**
   * Fonction à utiliser pour logger les évènements du serveur
   * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
   */
  readonly log: (...args: Array<any>) => void
  /**
   * Fonction à utiliser pour logger les évènements d'erreur du serveur
   * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
   */
  readonly error: (...args: Array<any>) => void
  /**
   * Méthode d'écoute du serveur
   * Son appel provoque l'écoute sur le port fournit du serveur
   */
  listen (): void
  /**
   * Arrête l'écoute du serveur.
   * Après cet appel, plus aucune connexion ne sera acceptée
   */
  close (): void
  /**
   * Méthode implémentant le comportement du serveur lors de la réception d'un message sur le réseau
   * Cette valeur est initialisée par le constructeur doit être en lecture seule au runtime
   */
  readonly onData: (socket: net.Socket, data: string) => void
}
