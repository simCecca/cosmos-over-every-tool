import { Graph as CosmoGraph, GraphConfigInterface } from "@cosmograph/cosmos";

interface Graph {
  nodes: Array<{ id: string }>;
  edges: Array<{ source: string; target: string }>;
}

type CosmosGraph = GraphConfigInterface<
  { id: string },
  { source: string; target: string }
>;

export interface CAProps extends CosmosLayoutProps {
  canvas: { width: number; height: number };
  graph: Graph;
}

export interface CosmosLayoutProps {
  cosmos?: CosmosGraph;
  options?: {
    maxExecutionTime: number;
  };
}

class CosmosAlgorithm {
  cosmos: CosmosGraph;

  constructor() {
    this.cosmos = {
      spaceSize: 8192,
      simulation: {
        linkDistance: 10,
        linkSpring: 0.15,
        repulsion: 150,
        friction: 0.9,
        gravity: 0.1,
        decay: 1000,
      },
    };
  }

  setCosmoProps = (cosmos: CosmosGraph) => {
    this.cosmos = cosmos;
  };

  runLayout = async (props: CAProps) => {
    if (props.cosmos) {
      this.cosmos = props.cosmos;
    }
    const myCanvas = document.createElement("canvas");
    myCanvas.width = props.canvas.width;
    myCanvas.height = props.canvas.height;

    const cosmoGraph = new CosmoGraph(myCanvas, this.cosmos);
    cosmoGraph.setData(props.graph.nodes, props.graph.edges);

    let maxTime = 0;
    if (props.options && props.options.maxExecutionTime != undefined) {
      maxTime = Math.ceil(props.options.maxExecutionTime / 1000);
    } else {
      maxTime =
        1 +
        Math.ceil(
          Math.log((props.graph.nodes.length + props.graph.edges.length) / 1000)
        );
      if (maxTime < 1) {
        maxTime = 1;
      }
    }

    await this.hasItFinished(cosmoGraph, maxTime);
    const newPositions = cosmoGraph.getNodePositions();
    cosmoGraph.destroy();
    return newPositions;
  };

  private hasItFinished = async (
    cosmoGraph: CosmoGraph<any, any>,
    maxTime: number
  ) => {
    let maxExecution = maxTime;
    while (cosmoGraph.isSimulationRunning && maxExecution > 0) {
      await sleep(1000);
      maxExecution--;
    }
    return !cosmoGraph.isSimulationRunning;
  };
}

export const sleep = (time: number) => {
  return new Promise((res) => setTimeout(res, time));
};

export default CosmosAlgorithm;
