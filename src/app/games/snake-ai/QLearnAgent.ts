import { SnakeState, Action, QTable, Vision } from './types';

export class QLearnAgent {
    private qTable: QTable = {};
    private learningRate: number = 0.1;
    private discountFactor: number = 0.95;
    private explorationRate: number = 1.0;
    private minExplorationRate: number = 0.01;
    private explorationDecay: number = 0.995;
    private storageKey: string = 'snake-qtable';

    constructor() {
        this.loadQTable();
    }

    private getStateKey(state: SnakeState): string {
        // Convert state to a string key for Q-table lookup
        return JSON.stringify({
            direction: state.direction,
            foodQuadrant: {
                x: Math.sign(state.food.xDistance),
                y: Math.sign(state.food.yDistance)
            },
            danger: state.danger,
            vision: Object.entries(state.vision).map(([dir, val]) => ({
                dir,
                wall: Math.round((val as Vision).wall * 4) / 4, // Discretize to reduce state space
                body: Math.round((val as Vision).body * 4) / 4
            }))
        });
    }

    public chooseAction(state: SnakeState): Action {
        const stateKey = this.getStateKey(state);
        
        // Exploration: Random action
        if (Math.random() < this.explorationRate) {
            const actions: Action[] = ["LEFT", "RIGHT", "STRAIGHT"];
            return actions[Math.floor(Math.random() * actions.length)];
        }
        
        // Exploitation: Best known action
        if (!this.qTable[stateKey]) {
            this.qTable[stateKey] = {
                "LEFT": 0,
                "RIGHT": 0,
                "STRAIGHT": 0
            };
        }
        
        const qValues = this.qTable[stateKey];
        const entries = Object.entries(qValues) as [Action, number][];
        return entries.reduce((a, b) => {
            if (typeof a === 'string') {
                return qValues[a] > qValues[b[0]] ? a : b[0];
            }
            return qValues[a[0]] > qValues[b[0]] ? a[0] : b[0];
        }, entries[0][0]);
    }

    public learn(
        currentState: SnakeState,
        action: Action,
        reward: number,
        nextState: SnakeState
    ): void {
        const currentStateKey = this.getStateKey(currentState);
        const nextStateKey = this.getStateKey(nextState);

        // Initialize Q-values if they don't exist
        if (!this.qTable[currentStateKey]) {
            this.qTable[currentStateKey] = {
                "LEFT": 0,
                "RIGHT": 0,
                "STRAIGHT": 0
            };
        }
        if (!this.qTable[nextStateKey]) {
            this.qTable[nextStateKey] = {
                "LEFT": 0,
                "RIGHT": 0,
                "STRAIGHT": 0
            };
        }

        // Q-learning update formula
        const currentQ = this.qTable[currentStateKey][action];
        const nextMaxQ = Math.max(...Object.values(this.qTable[nextStateKey]) as number[]);
        const newQ = currentQ + this.learningRate * (
            reward + this.discountFactor * nextMaxQ - currentQ
        );

        this.qTable[currentStateKey][action] = newQ;

        // Update exploration rate
        this.explorationRate = Math.max(
            this.minExplorationRate,
            this.explorationRate * this.explorationDecay
        );

        // Save to browser storage periodically
        if (Math.random() < 0.1) { // 10% chance to save on each learn step
            this.saveQTable();
        }
    }

    private saveQTable(): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.qTable));
        } catch (e) {
            console.warn('Failed to save Q-table to localStorage:', e);
        }
    }

    private loadQTable(): void {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.qTable = JSON.parse(saved);
                console.log('Loaded Q-table from localStorage');
            }
        } catch (e) {
            console.warn('Failed to load Q-table from localStorage:', e);
        }
    }

    public getExplorationRate(): number {
        return this.explorationRate;
    }

    public toString(): string {
        return JSON.stringify({
            qTable: this.qTable,
            explorationRate: this.explorationRate
        });
    }

    public loadFromString(data: string): void {
        try {
            const parsed = JSON.parse(data);
            if (parsed.qTable) {
                this.qTable = parsed.qTable;
            }
            if (parsed.explorationRate) {
                this.explorationRate = parsed.explorationRate;
            }
        } catch (e) {
            console.warn('Failed to load agent data from string:', e);
        }
    }

    public saveToFile(): void {
        const blob = new Blob([this.toString()], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'snake-qtable.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    public async loadFromFile(file: File): Promise<void> {
        try {
            const text = await file.text();
            this.loadFromString(text);
            this.saveQTable(); // Save to localStorage as well
        } catch (e) {
            console.error('Failed to load Q-table from file:', e);
        }
    }
} 