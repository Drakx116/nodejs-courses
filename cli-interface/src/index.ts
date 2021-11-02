import { ArgsParser } from "./ArgsParser";

const parser = new ArgsParser(process.argv);
const port = parser.getListeningPort();

if (parser.isServer()) {
  console.log(`Server is listening on localhost:${port}.`);
  process.exit(0);
}

const address = parser.getAddress();
if (!address) {
  console.log('Invalid IP address.');
  process.exit(0);
}

console.log(`IP to ping : ${address}`);
