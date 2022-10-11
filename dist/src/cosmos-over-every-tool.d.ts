import { GraphConfigInterface } from "@cosmograph/cosmos";
interface Graph {
    nodes: Array<{
        id: string;
    }>;
    edges: Array<{
        source: string;
        target: string;
    }>;
}
declare type CosmosGraph = GraphConfigInterface<{
    id: string;
}, {
    source: string;
    target: string;
}>;
export interface CAProps {
    canvas: {
        width: number;
        height: number;
    };
    graph: Graph;
    cosmos?: CosmosGraph;
    options?: {
        maxExecutionTime: number;
    };
}
declare class CosmosAlgorithm {
    cosmos: CosmosGraph;
    constructor();
    setCosmoProps: (cosmos: CosmosGraph) => void;
    runLayout: (props: CAProps) => Promise<{
        [key: string]: {
            x: number;
            y: number;
        };
    }>;
    private hasItFinished;
}
export declare const sleep: (time: number) => Promise<unknown>;
export default CosmosAlgorithm;
