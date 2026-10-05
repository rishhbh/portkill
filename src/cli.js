#!/usr/bin/env node
import { findProcess } from "./port.js";

const args = process.argv.slice(2);

const command = args[0];

if (args.includes('--help') || args.includes('-h')) {
    console.log(`portkill - Kill processes using network ports

Usage:
  portkill <port>...
  portkill all

Options:
  -h, --help       Show help
  -v, --version    Show version
`);

    process.exit(0);
}

if (!command) {
    console.log(`Usage:
- portkill <port>
- portkill all`);

    process.exit(1);
}

for (const port of args) {
    const pid = await findProcess(port);

    if (!pid) {
        console.log(`Nothing is using the port ${port}`);
        continue;
    }

    console.log(`Port ${port} is being used by PID ${pid}`);
}

console.log(args)
console.log(`Command: ${command}`)