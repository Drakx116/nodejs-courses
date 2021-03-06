export interface ClientInterface
{
  /**
   * Ping un serveur.
   * Récupère un temps de début en millisecondes
   * Se connecte à un serveur, lui envoit la chaine "PING", et attends de recevoir la réponse ("PONG")
   * Récupère un temps de fin en millisecondes
   * Renvoie la durée du ping (fin - début)
   */
  ping(): Promise<number | false>
}
