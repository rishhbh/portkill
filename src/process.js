export function killProcess(pid) {
    try {
        process.kill(Number(pid), "SIGTERM");
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }
}