import { ArgsParser } from "./ArgsParser";
import { Server } from "./Server";
import net from "net";
import { ServerInterface } from "./interfaces/ServerInterface";
import { Client } from "./Client";

const parser = new ArgsParser(process.argv);
const port = parser.getListeningPort();

if (parser.isServer()) {
  console.log(`The server tries to listen on localhost:${port} ...`);

  const server: ServerInterface = new Server({
    listeningPort: port,
    onData(socket: net.Socket, data: string): void {
      if (data === "PING") {
        socket.write("PONG");
        console.log('PONG');
      }
    }
  });

  server.listen();

  console.log(`Server is now listening on localhost:${port}`);
}
else {
  const address = parser.getAddress();
  if (!address) {
    console.log('Invalid IP address.');
    process.exit(0);
  }

  const client: Client = new Client({ port, address });
  client.ping().then(delay => console.log(`Delay : ${delay}ms`));
}
