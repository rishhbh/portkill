#!/usr/bin/env node

import { findProcess } from "./port.js";
import { killProcess, getProcessInfo, getExecutable } from "./process.js";
import { ask } from "./prompt.js";
import packageJson from "../package.json" with { type: "json" };

const args = process.argv.slice(2);

const command = args[0];

if (args.some(arg => arg.startsWith("-"))) {
    if (args.includes("--version") || args.includes("-v")) {
        console.log(packageJson.version);
        process.exit(0);
    }

    if (args.includes('--help') || args.includes('-h')) {
        console.log(`purgeport - Kill processes using network ports

Usage:
  purgeport <port>...
  purgeport all

Options:
  -h, --help       Show help
  -v, --version    Show version`);

        process.exit(0);
    }

    console.log(`Unknown option: ${args.find(arg => arg.startsWith("-"))}`);
    console.log(`Try 'purgeport --help' for available options.`);
    process.exit(1);
}

if (!command) {
    console.log(`Usage:
- purgeport <port>
- purgeport all`);

    process.exit(1);
}

for (const port of args) {
    const pid = await findProcess(port);

    if (!pid) {
        console.log(`The port ${port} is not in use.`);
        continue;
    }

    const info = await getProcessInfo(pid);
    const executable = await getExecutable(pid);

    info.process = executable || info.process;

    console.log(`Port ${port} is being used by PID ${pid}.`);
    console.log(`\nUser: ${info.user}\nCommand: ${info.args}\nProcess: ${info.process}\n`);

    const answer = await ask("Kill this process? [y/n]: ");

    if (answer.trim().toLowerCase() === 'y') {
        const killed = killProcess(pid);

        if (killed) {
            console.log(`Process ${pid} terminated.\n`)
        } else {
            console.log(`Failed to terminate the process ${pid}.`)
        }
    } else {
        console.log(`Process ${pid} was not terminated.`);
    }
}