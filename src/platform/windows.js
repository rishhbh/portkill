import { exec } from "node:child_process";

export function findProcessWin32(port) {
    return new Promise((resolve, reject) => {
        exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
            if (error) {
                resolve(null);
                return;
            }

            const lines = stdout.trim().split("\n");

            if (!lines.length) {
                resolve(null);
                return
            }

            const parts = lines[0].trim().split(/\s+/);
            const pid = parts[parts.length - 1];

            resolve(pid || null);
        });
    });
}