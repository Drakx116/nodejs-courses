import {ClientInterface} from "./interfaces/ClientInterface";
import {ClientConfigInterface} from "./interfaces/ClientConfigInterface";
import net from "net";

export class Client implements ClientInterface
{
  private connexion: net.Socket;

  constructor(config: ClientConfigInterface)
  {
    this.connexion = net.createConnection(config.port, config.address);
  }

  public ping = () => {
    const start = Date.now();
    this.connexion.write('PING');

    return new Promise((
        resolve: (delay: number) => void,
        reject: (value: false) => void
      ) => {
      this.connexion.on('data', (data) => {
        console.log(data);
        try {
          resolve(Date.now() - start);
          console.log('PING');
        }
        catch (e) {
          reject(false)
        }
      })
    })
  }

}
