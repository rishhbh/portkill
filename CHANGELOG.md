# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-10-10

### Added
- **Cross-Platform Process Discovery:** Port detection support for Windows using `netstat` alongside Unix/macOS `lsof`.
- **Process Inspection:** Displays detailed process information (owner `User`, command-line arguments `Command`, and binary path `Process`) before prompting for confirmation.
- **Cross-Platform Metadata Resolution:**
  - Windows process details (executable path, arguments, owner) resolved via PowerShell CIM cmdlets (`Get-CimInstance Win32_Process`).
  - macOS executable path resolution using `lsof -p <pid> -d txt -Fn`.
  - Linux executable path resolution using `/proc/<pid>/exe`.
- **CLI Flag Validation:** Unrecognized command-line flags are caught and rejected with an informative error message and exit code `1`.
- **Cross-Platform CI Workflow:** Automated GitHub Actions E2E integration test suite covering Linux, macOS, and Windows.

### Changed
- **Project Renaming:** Renamed the project from `portkill` to `purgeport`.
- **Modular Platform Architecture:** Refactored platform-specific resolution logic into dedicated modules (`src/platform/unix.js` and `src/platform/windows.js`) routed dynamically by `src/port.js` and `src/process.js`.

## [0.1.0] - 2026-10-06

### Added
- **Port Inspection:** Automatic detection of process IDs (PIDs) bound to specified network ports using `lsof`.
- **Interactive Confirmation:** Prompt asking for confirmation (`[y/n]`) prior to killing any process to prevent accidental terminations.
- **Multi-Port Support:** Ability to pass multiple ports in a single command (e.g., `purgeport 3000 8080`).
- **Process Termination:** Terminate identified processes using `SIGTERM`.
- **CLI Options:** Built-in `-h`, `--help` and `-v`, `--version` flags.
- **Executable Binary:** Executable `purgeport` binary setup via `package.json` pointing to `src/cli.js`.

[0.2.0]: https://github.com/rishhbh/purgeport/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rishhbh/purgeport/releases/tag/v0.1.0
