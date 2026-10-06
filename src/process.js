import { exec } from "node:child_process";

export function killProcess(pid) {
    try {
        process.kill(Number(pid), "SIGTERM");
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }
}

export function getProcessInfo(pid) {
    return new Promise((resolve, reject) => {
        exec(`ps -p ${pid} -o user=,exe=,args=`,
            (error, stdout) => {
                if (error) {
                    reject(error);
                }

                const [user, command, ...args] = stdout.trim().split(/\s+/);

                resolve({
                    pid,
                    user,
                    command,
                    args: args.join(" ")
                });
            }
        )
    });
}

export function getExecutable(pid) {
    return new Promise((resolve, reject) => {
        exec(`readlink -f /proc/${pid}/exe`, (error, stdout) => {
            if (error){
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
}