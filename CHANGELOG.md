# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-06

### Added
- **Port Inspection:** Automatic detection of process IDs (PIDs) bound to specified network ports using `lsof`.
- **Interactive Confirmation:** Prompt asking for confirmation (`[y/n]`) prior to killing any process to prevent accidental terminations.
- **Multi-Port Support:** Ability to pass multiple ports in a single command (e.g., `purgeport 3000 8080`).
- **Process Termination:** Terminate identified processes using `SIGTERM`.
- **CLI Options:** Built-in `-h`, `--help` and `-v`, `--version` flags.
- **Executable Binary:** Executable `purgeport` binary setup via `package.json` pointing to `src/cli.js`.
