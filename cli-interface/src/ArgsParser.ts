import { isIPv4 } from "net";

export interface ArgsParserInterface {
  /**
  * Le programme a-t-il été appelé en tant que Serveur ?
  * Le programme a été appelé en tant que serveur si l'argument "server" est présent au moins une fois sur la ligne de commande.
  */
  isServer (): boolean

  /**
  * Renvoie le numéro de port sur lequel écouter les connexions entrantes
  * La valeur est le premier nombre compris entre 10000 et 65535 qui aura été éventuellement transmis sur la ligne de commande.
  * Si aucune valeur transmise, la valeur par défaut est 23456
  */
  getListeningPort (): number

  /**
  * Renvoie la première adresse IPv4 transmise sur la ligne de commande.
  * Si aucune adresse IPv4 n'a été transmise sur la ligne de commande, renvoyer FALSE
  */
  getAddress (): string | false
}

export class ArgsParser implements ArgsParserInterface
{
  private readonly argv: string[];

  private readonly DEFAULT_PORT: number = 23456;
  private readonly MIN_PORT_VALUE: number = 10000;
  private readonly MAX_PORT_VALUE: number = 65535;

  constructor(argv: string[])
  {
    this.argv = argv;
  }

  isServer(): boolean
  {
    return this.argv.indexOf('server') !== -1;
  }

  getListeningPort(): number
  {
    for (let i = 0; i < this.argv.length; i++) {
      const argument = parseInt(this.argv[i]);

      if (argument >= this.MIN_PORT_VALUE && argument <= this.MAX_PORT_VALUE) {
        return argument;
      }
    }

    return this.DEFAULT_PORT;
  }

  getAddress(): string | false
  {
    for (let i = 0; i < this.argv.length; i++) {
      const argument = this.argv[i];

      if (isIPv4(argument)) {
        return argument;
      }
    }

    return false;
  }
}
