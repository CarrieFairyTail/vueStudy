<template>
  <div id="monthBill">
    <div class="month" v-for="item in monthOptions" :key="item">
      {{item}}
      <div id="innerViewMonth"></div>
    </div>
  </div>
</template>

<script>
  import Echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    name: "monthBill",
    data() {
      return {
        monthOptions: 12,
        viewOption: {
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data:[
                {value:235, name:'支出'},
                {value:274, name:'收入'},
              ]
            }
          ]
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
        this.chart = Echarts.init(document.getElementById('innerViewMonth'))
        this.chart.setOption(this.viewOption)
      }
    }
  }
</script>

<style lang="stylus" scoped>
#monthBill
  display flex
  flex-wrap wrap
  .month
    width 400px
    height 200px
    border-radius 20px
    box-shadow 4px 4px 10px #cccccc
    font-size 20px
    font-weight 700
    padding 10px
    #innerViewMonth
      width 300px
      height 200px
      margin 0 auto
</style>