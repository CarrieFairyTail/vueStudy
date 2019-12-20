<template>
  <div id="billHome">
    <div class="container">
      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
          记账本
        </div>
        <div class="navbar-right">
          <a href="#" class="navbar-link">我的</a>
        </div>
      </nav>
      <div class="row text-center row1">
        <div class="col-sm-3">
          2019年
        </div>
        <div class="col-sm-6 middle">
          结余
        </div>
        <div class="col-sm-3">
          计划
        </div>
      </div>
      <div class="row row2">
        <div class="col-sm-3">
<!--          <el-calendar v-model="dateTime">-->
<!--          </el-calendar>-->
          <calendar @selectedDate="selectedDate"></calendar>
        </div>
        <div class="col-sm-7">
<!--          <div class="btn-group" role="group" aria-label="...">-->
<!--            <button type="button" class="btn btn-secondary">周</button>-->
<!--            <button type="button" class="btn btn-secondary">月</button>-->
<!--            <button type="button" class="btn btn-secondary">年</button>-->
<!--          </div>-->
          <el-radio-group v-model="tabPosition">
            <el-radio-button label="week">周</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
            <el-radio-button label="year">年</el-radio-button>
          </el-radio-group>
          <div id="week-view" v-show="tabPosition==='week'"></div>
          <div id="month-view" v-show="tabPosition==='month'"></div>
          <div id="year-view" v-show="tabPosition==='year'"></div>
        </div>
        <div class="col-sm-2">
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
          <div class="timeline">
            <el-timeline :reverse="reverse">
              <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.date">
                {{activity.note}}-{{activity.money}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from "../components/calendar/calendar"
  import JsonUtil from "../../../utils/JsonUtil"
  import Echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    name: "billHome",
    components: {Calendar},
    data() {
      return {
        reverse: true,
        dateTime: new Date(),
        activities: [],
        tabPosition: 'week',
        viewOption:{
          title: {
            text: '周视图'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        viewOption1:{
          title: {
            text: '月视图'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 5, 5, 5, 1, 2]
          }]
        },
        viewOption2:{
          title: {
            text: '年视图'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 5, 5, 5, 1, 2]
          }]
        },
        chart: null
      }
    },
    mounted() {
      this.getMdetail()
      this.initEcharts()
    },
    watch: {
      tabPosition(val) {
        if (val === 'month') {
          this.chart = null
          this.initMonth()
        } else if (val === 'year') {
          this.initYear()
        }
      }
    },
    methods: {
      selectedDate(val) {
        console.log('时间：' + val)
      },
      getMdetail() {
        JsonUtil.get('billData')
          .then(res => {
            if (res.result) {
              this.activities = res.data
            }
          })
      },
      initEcharts() {
        this.chart = Echarts.init(document.getElementById('week-view'))
        this.chart.setOption(this.viewOption)
      },
      initMonth() {
        this.chart = Echarts.init(document.getElementById('month-view'))
        console.log('这边：'+this.chart)
        this.chart.setOption(this.viewOption1)
      },
      initYear() {
        this.chart = Echarts.init(document.getElementById('year-view'))
        this.chart.setOption(this.viewOption2)
      }
    }
  }
</script>

<style lang="stylus" scoped>
#billHome
  .container
    nav
      background-color #09315B
      color wheat
      margin-bottom 10px
    .row1
      height 150px
      background-color #ccc
      margin-bottom 10px
      .middle
        background-color #09315B
        border-radius 20px
        color wheat
    .row2
      height calc(100vh - 250px)
      background-color white
      .col-sm-4,.col-sm-7
        border #72767b solid 1px
  #week-view
    width 100%
    height 100%
  #month-view
    width 100%
    height 100%
  #year-view
    width 100%
    height 100%
</style>