class Logger {
    /**
     * info
     */
    public static info(namespace: string, message: string, object?: any) {
        if (object) console.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
        else console.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
    /**
     * warn
     */
    public static warn(namespace: string, message: string, object?: any) {
        if (object) console.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
        else console.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }

    /**
     * error
     */
    public static error(namespace: string, message: string, object?: any) {
        if (object) console.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
        else console.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }

    /**
     * debug
     */
    public static debug(namespace: string, message: string, object?: any) {
        if (object) console.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
        else console.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }

    /**
     * getTimeStamp
     */
    private static getTimeStamp(): string {
        return new Date().toUTCString();
    }
}
export default Logger;