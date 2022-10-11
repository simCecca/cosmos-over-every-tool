var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Graph as CosmoGraph } from "@cosmograph/cosmos";
class CosmosAlgorithm {
    constructor() {
        this.setCosmoProps = (cosmos) => {
            this.cosmos = cosmos;
        };
        this.runLayout = (props) => __awaiter(this, void 0, void 0, function* () {
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
            }
            else {
                maxTime =
                    1 +
                        Math.ceil(Math.log((props.graph.nodes.length + props.graph.edges.length) / 1000));
                if (maxTime < 1) {
                    maxTime = 1;
                }
            }
            yield this.hasItFinished(cosmoGraph, maxTime);
            const newPositions = cosmoGraph.getNodePositions();
            cosmoGraph.destroy();
            return newPositions;
        });
        this.hasItFinished = (cosmoGraph, maxTime) => __awaiter(this, void 0, void 0, function* () {
            let maxExecution = maxTime;
            while (cosmoGraph.isSimulationRunning && maxExecution > 0) {
                yield sleep(1000);
                maxExecution--;
            }
            return !cosmoGraph.isSimulationRunning;
        });
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
}
export const sleep = (time) => {
    return new Promise((res) => setTimeout(res, time));
};
export default CosmosAlgorithm;
//# sourceMappingURL=cosmos-over-every-tool.js.map