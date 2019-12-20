<template>
  <div id="yearBill">
    <div class="year" v-for="(item, i) in yearOptions" :key="i">
      {{item.label}}
      <div>
        <i class="el-icon-circle-plus-outline"></i>
        <i class="el-icon-remove-outline"></i>
      </div>
    </div>
    <div id="innerView"></div>
  </div>
</template>

<script>
  import Echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    name: "yearBill",
    data() {
      return {
        yearOptions: [
          {
            id: '2019',
            value: '2019',
            label: '2019'
          }
        ],
        viewOption:
          {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }]
          },
        chart: null
      }
    },
    mounted() {
      this.initView()
    },
    methods: {
      // 图表
      initView() {
        this.chart = Echarts.init(document.getElementById('innerView'))
        this.chart.setOption(this.viewOption)
      }
    }
  }
</script>

<style lang="stylus" scoped>
#yearBill
  padding 10px 20px
  .year
    width 200px
    height 100px
    border-radius 20px
    box-shadow 4px 4px 10px #cccccc
    font-size 20px
    font-weight 700
    padding 10px
  #innerView
    width 500px
    height 500px
</style>