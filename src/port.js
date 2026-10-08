import { findProcessUnix } from "./platform/unix.js"
import { findProcessWin32 } from "./platform/windows.js";

export function findProcess(port) {
    if (process.platform === 'linux' || process.platform === 'darwin') {
        return findProcessUnix(port);
    }

    if (process.platform === 'win32') {
        return findProcessWin32(port);
    }
    
    throw new Error(`Unsupported operating system: ${process.platform}`);
}
