#!/usr/bin/env node

import { findProcess } from "./port.js";
import { killProcess } from "./process.js";
import { ask } from "./prompt.js";

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
        console.log(`The port ${port} is not in use.`);
        continue;
    }

    console.log(`Port ${port} is being used by PID ${pid}.`);

    const answer = await ask("Kill this process? [y/n]: ");

    if (answer.trim().toLowerCase() === 'y') {
        const killed = killProcess(pid);

        if (killed) {
            console.log(`Process ${pid} terminated.`)
        } else {
            console.log(`Failed to terminate the process ${pid}.`)
        }
    } else {
        console.log(`Process ${pid} was not terminated.`);
    }


}