import process from "process";

const isClient: boolean = process.argv.indexOf('client') != -1;
const isServer: boolean = process.argv.indexOf('server') != -1;

if (isClient) {
  const ipAddress = process.argv[3] ?? null;

  if (!ipAddress) {
    console.warn('Did you forget to specify an IP Address ?');
    process.exit(0);
  }

  console.log(ipAddress);
  process.exit(1);
}

if (!isServer) {
  console.error('What are you doing here ?');
  process.exit(0);
}

console.log('Hello there !');
