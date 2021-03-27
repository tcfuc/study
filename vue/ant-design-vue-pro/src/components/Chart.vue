<template>
  <div ref="charDom"></div>
</template>

<script>
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  props: {
    option: {
      type: Object,
      deafault: () => {},
    },
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    },
  },
  created() {
    this.resize = debounce(this.resize);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.charDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.charDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      // 注册必须的组件
      echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        BarChart,
        CanvasRenderer,
      ]);
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.charDom);
      // 绘制图表
      this.chart.setOption(this.option);
    },
  },
};
</script>

<style>
</style>