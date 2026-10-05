# portkill

> A fast and simple CLI tool to find and kill processes occupying network ports.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Ever run into `Error: listen EADDRINUSE: address already in use :::3000` while developing? **portkill** quickly terminates the process hogging your port so you can get back to building without searching for PIDs manually.

---

## Features

- **Fast & Lightweight:** Kill processes by port number in one command.
- **No PID lookup required:** Automatically detects and terminates the culprit process.
- **Cross-Platform:** Works on Linux, macOS, and Windows.
- **Zero Hassle:** Use directly via `npx` or install globally.

---

## Installation

### Global Installation

Install globally using your favorite package manager:

```bash
# Using npm
npm install -g portkill

# Using pnpm
pnpm add -g portkill

# Using yarn
yarn global add portkill
```

### Running without Installation

You can also run it on demand without installing globally:

```bash
npx portkill <port>
```

---

## Usage

### Kill a process on a specific port

```bash
portkill <port>
```

**Example:**

```bash
portkill 3000
```

### Usage Options

```text
Usage:
  portkill <port>       Kill process running on the specified port
  portkill all          Kill all processes occupying listening ports
```

---

## Permissions Note

If a process was started by another user or requires elevated permissions (common on system ports like `80` or `443`), you may need superuser privileges:

```bash
# On Linux / macOS
sudo portkill 80
```

---

## Development

Clone the repository and link it locally to test changes:

```bash
git clone https://github.com/rishabhsharma/portkill.git
cd portkill
npm link
```

Now you can test changes using `portkill <port>` directly from your terminal.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Rishabh Sharma](https://github.com/rishabhsharma).
