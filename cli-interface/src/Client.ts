import {IClient} from "./interfaces/IClient";
import {IClientConfig} from "./interfaces/IClientConfig";
import net from "net";

export class Client implements IClient
{
  private connexion: net.Socket;

  constructor(config: IClientConfig)
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
