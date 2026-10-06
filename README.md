# purgeport

> A fast and simple CLI tool to find and kill processes occupying network ports.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Ever run into `Error: listen EADDRINUSE: address already in use :::3000` while developing? **purgeport** detects which process is hogging your port and terminates it after confirmation, without needing to search for PIDs manually.

---

## Features (Currently Available)

- **Port Lookup:** Automatically identifies the process (PID) occupying a given port.
- **Interactive Safety Check:** Prompts for confirmation (`[y/n]`) before terminating any process.
- **Multi-Port Support:** Check and terminate processes across multiple ports in a single command.
- **Zero Runtime Dependencies:** Built purely using Node.js standard libraries and system utilities.
- **CLI Flags:** Includes `-h` / `--help` and `-v` / `--version`.

---

## Prerequisites

- **Node.js** (v18.0.0 or higher recommended, ESM support)
- **Linux or macOS** with `lsof` installed (standard on macOS and most Linux distributions)

---

## Installation

### Global Installation

Install globally using your favorite package manager:

```bash
# Using npm
npm install -g purgeport

# Using pnpm
pnpm add -g purgeport

# Using yarn
yarn global add purgeport
```

### Running without Installation

Run directly on demand via `npx`:

```bash
npx purgeport <port>
```

---

## Usage

### Kill a process on a specific port

```bash
purgeport 3000
```

When a process is detected, you will be prompted to confirm termination:

```text
Port 3000 is being used by PID 41280.
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

---

## Permissions Note

If a process was started by another user or requires elevated permissions (common on system ports like `80` or `443`), you may need superuser privileges:

```bash
# On Linux / macOS
sudo purgeport 80
```

---

## Development

Clone the repository and link it locally to test changes:

```bash
git clone https://github.com/rishhbh/purgeport.git
cd purgeport
npm link
```

Now you can test changes using `purgeport <port>` directly from your terminal.

---

## Future Improvements & Technical Roadmap

The following features are planned for upcoming releases:

- **`purgeport all` Implementation:** Automatically discover and terminate all processes currently listening on network ports.
- **Native Windows Support:** Add native Windows process resolution and termination (`netstat -ano`, PowerShell `Get-NetTCPConnection`, `taskkill`) to remove the `lsof` dependency.
- **Force Mode (`-f` / `--force`):** Allow bypassing the interactive confirmation prompt for non-interactive scripts and CI workflows.
- **Configurable Kill Signals (`-s` / `--signal`):** Support escalation from `SIGTERM` to `SIGKILL` (`kill -9`) for unresponsive processes.
- **Multi-PID Handling per Port:** Properly parse and terminate multiple processes sharing or bound to the same port.
- **Process Inspection:** Display process names, executable paths, or command arguments alongside the PID before prompting for termination.
- **Port Ranges:** Support scanning and killing port ranges (e.g. `purgeport 3000-3005`).
- **Protocol Filtering:** Add options to filter by protocol (`--tcp` or `--udp`).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Rishabh Sharma](https://github.com/rishabhsharma).
