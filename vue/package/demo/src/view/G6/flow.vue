<template>
  <div style="width: 100%; height: 100%">
    <div id="mountNode"></div>
  </div>
</template>

<script>
import data from "@/mock/G6.js";
import G6 from "@antv/g6";

export default {
  data() {
    return {};
  },
  mounted() {
    //  this.createTreeGraph();
    this.createGraph();
  },
  methods: {
    async createTreeGraph() {
      const minimap = new G6.Minimap({
        container: "mountNode",
        size: [160, 80],
      });
      const grid = new G6.Grid();

      const treeGraph = new G6.TreeGraph({
        container: "mountNode",
        width: 800,
        height: 400,
        fitView: true,
        plugins: [minimap, grid],
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange(item, collapsed) {
                const icon = item.get("group").findByClassName("collapse-icon");
                if (collapsed) {
                  icon.attr("symbol", EXPAND_ICON);
                } else {
                  icon.attr("symbol", COLLAPSE_ICON);
                }
              },
            },
            "drag-canvas",
            "zoom-canvas",
          ],
        },
        layout: {
          type: "indented",
          direction: "LR",
          indent: 300,
          dropCap: false,
        },
        defaultNode: {
          type: "modelRect",
          size: [230, 50],
          logoIcon: false,
          stateIcon: false,
        },
        defaultEdge: {
          type: "polyline",
          style: {
            endArrow: true,
          },
        },
      });
      // 读取数据
      const flowData = await this.formatTree(data.flow.data);
      treeGraph.data(flowData[0]);
      // 渲染图
      treeGraph.render();
    },
    formatTree(array) {
      return new Promise((resolve, reject) => {
        const result = array
          .filter((item) => !item.pid)
          .map((item) => this.getChildren(array, item));
        resolve(result);
      });
    },
    getTreeItem(array, pid) {
      const result = array
        .filter((item) => item.pid == pid)
        .map((item) => this.getChildren(array, item));
      return result;
    },
    getChildren(array, item) {
      let one = {
        id: item.id,
        label: item.recvDeptName,
        description: item.statusName,
        children: [],
      };
      one.children = this.getTreeItem(array, item.id);
      return one;
    },
    async createGraph() {
      G6.registerNode(
        "round-rect",
        {
          drawShape: (cfg, group) => {
            let width = cfg.style.width;
            let stroke = cfg.style.stroke;
            let rect = group.addShape("rect", {
              attrs: {
                x: -width / 2,
                y: -15,
                width: width,
                height: 30,
                radius: 15,
                stroke: stroke,
                lineWidth: 1.2,
                fillOpacity: 1,
              },
            });
            let circleLeft = group.addShape("circle", {
              attrs: {
                x: -width / 2,
                y: 0,
                r: 3,
                fill: stroke,
              },
            });
            let circleRight = group.addShape("circle", {
              attrs: {
                x: width / 2,
                y: 0,
                r: 3,
                fill: stroke,
              },
            });
            return rect;
          },
          getAnchorPoints: () => {
            return [
              [0, 0.5],
              [1, 0.5],
            ];
          },
          update: (cfg, item) => {
            let group = item.getContainer();
            let children = group.get("children");
            let node = children[0];
            let circleLeft = children[1];
            let circleRight = children[2];

            let stroke = cfg.style.stroke,
              labelStyle = cfg.labelStyle;

            if (stroke) {
              node.attr("stroke", stroke);
              circleLeft.attr("fill", stroke);
              circleRight.attr("fill", stroke);
            }
          },
        },
        "single-shape"
      );

      G6.registerEdge("polyline", {
        itemType: "edge",
        draw: (cfg, group) => {
          let startPoint = cfg.startPoint;
          let endPoint = cfg.endPoint;
          let centerPoint = {
            x: (startPoint.x + endPoint.x) / 2,
            y: (startPoint.y + endPoint.y) / 2,
          };

          let Ydiff = endPoint.y - startPoint.y;

          let slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

          let cpOffset = 16;
          let offset = Ydiff < 0 ? cpOffset : -cpOffset;

          let line1EndPoint = {
            x: startPoint.x + slope,
            y: endPoint.y + offset,
          };
          let line2StartPoint = {
            x: line1EndPoint.x + cpOffset,
            y: endPoint.y,
          };

          // 控制点坐标
          let controlPoint = {
            x:
              ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
                (line1EndPoint.y - startPoint.y) +
              startPoint.x,
            y: endPoint.y,
          };

          let path = [
            ["M", startPoint.x, startPoint.y],
            ["L", line1EndPoint.x, line1EndPoint.y],
            [
              "Q",
              controlPoint.x,
              controlPoint.y,
              line2StartPoint.x,
              line2StartPoint.y,
            ],
            ["L", endPoint.x, endPoint.y],
          ];

          if (Ydiff === 0) {
            path = [
              ["M", startPoint.x, startPoint.y],
              ["L", endPoint.x, endPoint.y],
            ];
          }

          let line = group.addShape("path", {
            attrs: {
              path: path,
              stroke: "#72CC4A",
              lineWidth: 1.2,
              endArrow: false,
            },
          });

          let labelLeftOffset = 8;
          let labelTopOffset = 8;
          // refineStatus
          let refineStatus = group.addShape("text", {
            attrs: {
              text: cfg.data.refineStatus,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y - labelTopOffset - 2,
              fontSize: 14,
              textAlign: "left",
              textBaseline: "middle",
              fill: "#000000D9",
            },
          });
          // status
          let status = group.addShape("text", {
            attrs: {
              text: cfg.data.status,
              x: line2StartPoint.x + labelLeftOffset,
              y:
                endPoint.y - labelTopOffset - refineStatus.getBBox().height - 2,
              fontSize: 11,
              textAlign: "left",
              textBaseline: "middle",
              fill: "#000000D9",
            },
          });
          // date
          let date = group.addShape("text", {
            attrs: {
              text: cfg.data.date,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y + labelTopOffset + 4,
              fontSize: 12,
              fontWeight: 300,
              textAlign: "left",
              textBaseline: "middle",
              fill: "#000000D9",
            },
          });
          return line;
        },
        afterDraw: (cfg, group) => {
            // 获得当前边的第一个图形，这里是边本身的 path
            const shape = group.get("children")[0];
            // 边 path 的起点位置
            const startPoint = shape.getPoint(0);

            // 添加红色 circle 图形
            const circle = group.addShape("circle", {
              attrs: {
                x: startPoint.x,
                y: startPoint.y,
                fill: "#72CC4A",
                r: 3,
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: "circle-shape",
            });

            // 对红色圆点添加动画
            circle.animate(
              (ratio) => {
                // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                // 根据比例值，获得在边 path 上对应比例的位置。
                const tmpPoint = shape.getPoint(ratio);
                // 返回需要变化的参数集，这里返回了位置 x 和 y
                return {
                  x: tmpPoint.x,
                  y: tmpPoint.y,
                };
              },
              {
                repeat: true, // 动画重复
                duration: 3000,
              }
            ); // 一次动画的时间长度
          },
      });

      let graph = new G6.Graph({
        container: "mountNode",
        width: 1000,
        height: 500,

        layout: {
          type: "dagre",
          rankdir: "LR",
          nodesep: 30,
          ranksep: 90,
        },
        modes: {
          default: ["zoom-canvas", "drag-canvas"],
        },
        defaultNode: {
          type: "round-rect",
          labelCfg: {
            style: {
              fill: "#000000A6",
              fontSize: 12,
            },
          },
          style: {
            stroke: "#72CC4A",
            width: 150,
          },
        },
        defaultEdge: {
          type: "polyline",
        },
      });

      let graphData = {
        nodes: "",
        edges: "",
      };

      graphData.nodes = await this.formatNodes(data.flow.data);
      graphData.edges = await this.formatEdges(data.flow.data);

      console.log(graphData);

      graph.data(graphData);
      graph.render();

      let edges = graph.getEdges();
      edges.forEach(function (edge) {
        let line = edge.getKeyShape();
        let stroke = line.attr("stroke");
        let targetNode = edge.getTarget();
        targetNode.update({
          style: {
            stroke: stroke,
          },
        });
      });
      graph.paint();
    },
    formatNodes(array) {
      return new Promise((resolve, reject) => {
        let nodes = array.map((item) => {
          return {
            id: item.id,
            label: item.recvDeptName,
          };
        });

        resolve(nodes);
      });
    },
    formatEdges(array) {
      return new Promise((resolve, reject) => {
        let edges = array
          .filter((item) => item.pid)
          .map((item) => {
            return {
              source: item.pid,
              target: item.id,
              data: {
                status: item.statusName,
                refineStatus: item.refineStatusName,
                date: item.createTime,
              },
            };
          });

        resolve(edges);
      });
    },
  },
};
</script>

<style>
</style>