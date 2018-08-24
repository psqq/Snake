
export enum Screens {
    GAME_SCREEN,
}

export abstract class Screen {
    abstract init(): void;
    start(): void {}
    pause(): void {}
    stop(): void {
        this.init();
    }
    restart(): void {
        this.stop();
        this.start();
    }
    abstract update(delta: number): void;
    abstract draw(): void;
}
