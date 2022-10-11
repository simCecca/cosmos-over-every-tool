This is a Simple project created and maintained with the **just for fun** philosophy

# cosmos-over-every-tool

This project aims to make available the power of the cosmos library visualization algorithm on any other tool

You can find the repo of this project here
https://github.com/simCecca/cosmos-over-every-tool

And the repo of cosmograph here
https://github.com/cosmograph-org/cosmos

# usage

- Install the library

```
npm install cosmos-over-every-tool
```

- Import it

```
import CosmosAlgorithm from "cosmos-over-every-tool";
```

- Create an instance

```
const cAlgo = new CosmosAlgorithm();
```

- Run the layout

```
cAlgo.runLayout(props: CAProps);

interface CAProps {
  canvas: { width: number; height: number };
  graph: Graph;
  cosmos?: CosmosGraph;
  options?: {
    maxExecutionTime: number;
  };
}
```

The CosmosGraph type is the same type you have in cosmograph, so you can use the whole
cosmos functionalities here

```
type CosmosGraph = GraphConfigInterface<
  { id: string },
  { source: string; target: string }
>;
```

The graph you can draw have to follow this structure

```
interface Graph {
  nodes: Array<{ id: string }>;
  edges: Array<{ source: string; target: string }>;
}
```

In addition to cosmos there is the possibility to set a maximum layout time

# an example

```
import CosmosAlgorithm from "cosmos-over-every-tool";

const cAlgo = new CosmosAlgorithm();

const container = document.querySelector("canvas");

const nodes = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
const edges = [{source: 1, target: 2}, {source: 1, target: 3}, {source: 1, target: 4}];

// feel free to handle the promise as you want (ex: async-await, then())
const positions = await cAlgo.runLayout({
        cosmos: {
          spaceSize: 8192,
          simulation: {
            linkDistance: 1,
            friction: 0.85,
            linkSpring: 1,
            repulsion: 0.2,
            repulsionTheta: 1,
            gravity: 0.25,
          },
        },
        options: { maxExecutionTime: 1000 },
        canvas: {
          height: container?.height || 1000,
          width: container?.width || 1000,
        },
        graph: { nodes, edges },
      });

// update your positions
```
