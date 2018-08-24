
type OnTickCallback = () => void;

export default class Timer {

    private tickInterval: number;
    private running: boolean;
    private idleTime: number;
    private onTick: OnTickCallback;
    private toAmountIdleTime: boolean;

    constructor(tickInterval: number, onTick: OnTickCallback, toAmountIdleTime = false) {
        this.tickInterval = tickInterval;
        this.running = false;
        this.toAmountIdleTime = toAmountIdleTime;
        this.idleTime = 0;
        this.onTick = onTick;
    }

    start() {
        this.running = true;
    }

    pause() {
        this.running = false;
    }

    stop() {
        this.running = false;
        this.idleTime = 0;
    }

    update(delta: number) {
        if (this.running == false) {
            return;
        }
        this.idleTime += delta;
        if (this.toAmountIdleTime) {
            while (this.idleTime > this.tickInterval) {
                this.idleTime -= this.tickInterval;
                this.onTick();
            }
        } else {
            this.idleTime = 0;
            this.onTick();
        }
    }
}
