<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <!-- <div id="mountNode"></div> -->
    <flow></flow>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import data from "@/mock/G6.js";

import flow from "./flow.vue";

export default {
  components: {
    flow,
  },
  data() {
    return {};
  },
  mounted() {
    // this.createGraph();
  },
  methods: {
    async createGraph() {
      const grid = new G6.Grid();

      const graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 1000, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        fitView: true, // 设置是否将图适配到画布中
        // fitViewPadding: [20, 40, 50, 20], // 画布上四周的留白宽度
        plugins: [grid], // 插件
        // 交互事件
        modes: {
          default: [
            {
              type: "drag-canvas",
            },
            {
              type: "zoom-canvas",
            },
          ],
        },
        // 节点不同状态下的样式集合
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue",
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: "#000",
            lineWidth: 3,
          },
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: "steelblue",
          },
        },
      });
      // 读取数据
      const data = await this.getData();
      graph.data(data);
      // 渲染图
      graph.render();

      // 监听鼠标进入节点
      graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 为 true
        graph.setItemState(nodeItem, "hover", true);
      });
      // 监听鼠标离开节点
      graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 false
        graph.setItemState(nodeItem, "hover", false);
      });
      // 监听鼠标点击节点
      graph.on("node:click", (e) => {
        // 先将所有当前有 click 状态的节点的 click 状态置为 false
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach((cn) => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem = e.item;
        // 设置目标节点的 click 状态 为 true
        graph.setItemState(nodeItem, "click", true);
      });
      // 监听鼠标点击节点
      graph.on("edge:click", (e) => {
        // 先将所有当前有 click 状态的边的 click 状态置为 false
        const clickEdges = graph.findAllByState("edge", "click");
        clickEdges.forEach((ce) => {
          graph.setItemState(ce, "click", false);
        });
        const edgeItem = e.item;
        // 设置目标边的 click 状态 为 true
        graph.setItemState(edgeItem, "click", true);
      });
    },
    getData() {
      return new Promise(async (resolve, reject) => {
        const response = await fetch(
          "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
        );
        const remoteData = await response.json();
        const nodes = remoteData.nodes;
        const edges = remoteData.edges;
        nodes.forEach((node) => {
          if (!node.style) {
            node.style = {};
          }
          node.style.lineWidth = 1;
          node.style.stroke = "#666";
          node.style.fill = "steelblue";
          switch (node.class) {
            case "c0": {
              node.type = "circle";
              node.size = 30;
              break;
            }
            case "c1": {
              node.type = "rect";
              node.size = [35, 20];
              break;
            }
            case "c2": {
              node.type = "ellipse";
              node.size = [35, 20];
              break;
            }
          }
        });
        edges.forEach((edge) => {
          if (!edge.style) {
            edge.style = {};
          }
          edge.style.lineWidth = edge.weight;
          edge.style.opacity = 0.6;
          edge.style.stroke = "grey";
        });
        resolve(remoteData);
      });
    },
  },
};
</script>

<style>
</style>