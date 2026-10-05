#!/usr/bin/env node

const args = process.argv.slice(2);

const command = args[0];

if (!command) {
    console.log(`Usage:
- portkill <port>
- portkill all
        `);

    process.exit(1);
}

console.log(args)
console.log(`Command: ${command}`)