# purgeport

A CLI tool to find and kill processes occupying network ports.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Ever run into `Error: listen EADDRINUSE: address already in use :::3000`? **purgeport** finds whatever process is holding the port, shows you what it is, and kills it after you confirm.

---

## Features

- **Process Inspection:** Shows the user, full command, and executable path before prompting to kill, so you don't terminate the wrong process by mistake.
- **Cross-Platform Port Lookup:** Uses `lsof` on Linux/macOS and `netstat` on Windows to resolve PIDs.
- **Interactive Confirmation:** Always asks `[y/n]` before sending `SIGTERM`.
- **Multi-Port Support:** Check and kill processes on multiple ports in a single command.
- **CLI Flag Validation:** Validates options and shows error messages for unrecognized flags.
- **Zero Runtime Dependencies:** Uses only Node.js standard libraries and native OS commands.

---

## Prerequisites

- **Node.js** (v18.0.0 or higher)
- **Supported OS:**
  - Linux / macOS (uses `lsof`, `ps`, and `/proc`)
  - Windows (uses `netstat`)

---

## Installation

### Global Install

```bash
# npm
npm install -g purgeport

# pnpm
pnpm add -g purgeport

# yarn
yarn global add purgeport
```

### Run via npx

```bash
npx purgeport <port>
```

---

## Usage

### Kill a process on a single port

```bash
purgeport 3000
```

When a process is found, its details are displayed before asking for confirmation:

```text
Port 3000 is being used by PID 41280.

User: rishabh
Command: node server.js
Process: /home/rishabh/.nvm/versions/node/v20.0.0/bin/node

Kill this process? [y/n]: y
Process 41280 terminated.
```

### Kill processes across multiple ports

```bash
purgeport 3000 8080 5000
```

### CLI Options

```bash
purgeport --help       # Show help message
purgeport --version    # Show installed version
```

Unrecognized flags exit with an error:

```text
$ purgeport --foo
Unknown option: --foo
Try 'purgeport --help' for available options.
```

---

## How It Works

1. **Port resolution:**
   - **Linux / macOS:** Runs `lsof -i :<port> -t` to locate the PID.
   - **Windows:** Runs `netstat -ano | findstr :<port>` to locate the PID.
2. **Process inspection (Linux):** Reads `/proc/<pid>/exe` for the binary path and runs `ps -p <pid> -o user=,exe=,args=` for owner and arguments.
3. **Termination:** Calls `process.kill(pid, "SIGTERM")` after user confirms with `y`.

---

## Permissions

If a process was started by root or another user (or runs on privileged ports like `80` or `443`), run with elevated privileges:

```bash
# Linux / macOS
sudo purgeport 80
```

---

## Development

Clone the repo and link it locally to test changes:

```bash
git clone https://github.com/rishhbh/purgeport.git
cd purgeport
npm link
```

Now you can run `purgeport <port>` directly.

---

## Roadmap

Planned features and known gaps:

- **`purgeport all`:** Discover and terminate all active listening ports at once.
- **Full Windows Process Inspection:** Add native Windows process metadata lookup and `taskkill` fallback.
- **Force Mode (`-f` / `--force`):** Bypass confirmation for scripts and CI.
- **Configurable Kill Signals (`-s` / `--signal`):** Fallback from `SIGTERM` to `SIGKILL` (`kill -9`) for stubborn processes.
- **Multi-PID Handling:** Handle multiple processes sharing or bound to the same port.
- **Port Ranges:** Support syntax like `purgeport 3000-3005`.
- **Protocol Filtering:** Filter by `--tcp` or `--udp`.

---

## License

MIT - see [LICENSE](LICENSE) for details.

## Author

Created by [Rishabh Sharma](https://github.com/rishhbh).
