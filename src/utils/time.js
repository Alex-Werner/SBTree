class Timer {
    constructor(props = {}) {
        this.startTs = props?.startTs || 0;
        this.endTs = props?.endTs || 0;
        this.duration = props?.duration || {
            nano: 0,
            ms: 0,
            s: 0,
        }
    }

    start() {
        this.startTs = performance.now();
    }

    stop() {
        this.endTs = performance.now();
        // Calculate elapsed time in milliseconds
        const elapsedMs = this.endTs - this.startTs;
        // Update duration in different units
        this.duration.ms = elapsedMs;
        this.duration.s = elapsedMs / 1000;
        // Convert milliseconds to nanoseconds for nano property
        this.duration.nano = elapsedMs * 1e6;
    }
}

export { Timer };
