import http from 'http';

export interface IWSServerConfig
{
  /**
   * Instance du Serveur HTTP renvoyé par http.createServer()
   */
  httpServer: http.Server;

  /**
   * Eventuelle fonctione de log customisée.
   * Si aucune fonction n'est fournie, utiliser console.log
   */
  log?: (...args: Array<any>) => void
}
