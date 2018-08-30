export interface SimpleRoutingComponentState {
    current: string;
    history: Array<string>;
    locked: boolean;
    newProps: Object;
}