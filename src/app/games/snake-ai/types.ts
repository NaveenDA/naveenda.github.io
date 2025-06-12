export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Action = "LEFT" | "RIGHT" | "STRAIGHT";

export interface Vision {
    wall: number;
    body: number;
}

export interface SnakeState {
    direction: Record<Direction, boolean>;
    food: {
        xDistance: number;
        yDistance: number;
    };
    danger: {
        straight: boolean;
        left: boolean;
        right: boolean;
    };
    vision: {
        N: Vision;
        NE: Vision;
        E: Vision;
        SE: Vision;
        S: Vision;
        SW: Vision;
        W: Vision;
        NW: Vision;
    };
}

export type QValues = Record<Action, number>;

export interface QTable {
    [stateKey: string]: QValues;
} 