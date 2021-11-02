import { isIPv4 } from "net";
import {ArgumentParserInterface} from "./interfaces/ArgumentParserInterface";

export class ArgsParser implements ArgumentParserInterface
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
