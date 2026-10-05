import { exec } from "node:child_process";

export function findProcess(port) {
    return new Promise((resolve, reject) => {
        exec(`lsof -i :${port} -t`, (error, stdout) => {
            if (error) {
                resolve(null);
                return;
            }

            const pid = stdout.trim();

            resolve(pid || null);
        });
    });
}