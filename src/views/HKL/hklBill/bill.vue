<template>
  <div id="bill">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;">
      <el-radio-button label="year">年</el-radio-button>
      <el-radio-button label="month">月</el-radio-button>
      <el-radio-button label="date">日</el-radio-button>
    </el-radio-group>
    <el-button type="text" @click="showView" style="font-size: 20px">
      <i class="el-icon-data-line"></i>
    </el-button>
    <el-dialog
        :title="nowDate.toLocaleDateString()"
        :visible.sync="dialogViewVisible"
        width="50%">
      <div id="innerView"></div>
    </el-dialog>
    <year-bill v-show="tabPosition === 'year'"></year-bill>
    <month-bill v-show="tabPosition === 'month'"></month-bill>
    <div class="date" v-show="tabPosition === 'date'">
      <div class="date-header">
        <i class="el-icon-arrow-left" @click="lastYear"></i>
        <i class="el-icon-arrow-left" @click="lastMonth"></i>
        <span id="year">{{navYear}}</span>
        <span id="month">{{navMonth}}</span>
        <span>{{nowTime}}</span>
        <i class="el-icon-arrow-right" @click="nextMonth"></i>
        <i class="el-icon-arrow-right" @click="nextYear"></i>
      </div>
      <div class="date-body">
        <div class="date-body-header">
          <table>
            <thead>
            <tr><td v-for="(item, i) in weekList" :key="i">{{item}}</td></tr>
            </thead>
            <tbody id="dateTable">
              <tr v-for="(item, i) in week" :key="i">
                <td v-for="(t, n) in week[i]" :key="n" @click="generateToday(t)"
                  :class="[{'now': t.toLocaleDateString()===new Date().toLocaleDateString()},
                  {'change': t.toDateString()===dateInfo.toDateString()},
                  {'fontColor': t.getMonth() !== date.getMonth()}]">
                  <span>{{t.getDate()}}</span>
                  <div>
                    <i class="el-icon-circle-plus-outline" style="color: cadetblue"></i>
                    <i class="el-icon-remove-outline" style="color: brown"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <el-dialog
        :title="nowDate.toLocaleDateString()"
        :visible.sync="dialogVisible"
        width="50%">
      <div class="flexBetween">
        <div class="kuang left">
          <div @click="addMoney"><i class="el-icon-circle-plus-outline"></i> 收入</div>
          <div class="kuang-inner">
            <el-table
                :data="tableData"
                style="width: 90%">
              <el-table-column
                  prop="incident"
                  label="事项">
              </el-table-column>
              <el-table-column
                  prop="money"
                  label="金额">
              </el-table-column>
            </el-table>
          </div>
          <div class="total">合计：{{addTotal}} RMB</div>
        </div>
        <div class="kuang right">
          <div @click="deleteMoney"><i class="el-icon-remove-outline"></i> 支出</div>
          <div class="kuang-inner">
            <el-table
                :data="deleteTable"
                style="width: 90%">
              <el-table-column
                  prop="incident"
                  label="事项">
              </el-table-column>
              <el-table-column
                  prop="money"
                  label="金额">
              </el-table-column>
            </el-table>
          </div>
          <div class="total">合计：{{deleteTotal}} RMB</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
        :title="tag"
        :visible.sync="dialoginnerVisible"
        width="30%"
        :close-on-click-modal="false">
      <div class="inner-bottom">
        <span>事项：</span>
        <el-input placeholder="啥事项啊"></el-input>
      </div>
      <div>
        <span>金额：</span>
        <el-input placeholder="多少钱啊"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialoginnerVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialoginnerVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/legend'
  import YearBill from "./yearBill";
  import MonthBill from "./monthBill";
  export default {
    name: "bill",
    data() {
      return {
        tabPosition: 'date',
        nowDate: new Date(),
        dialogVisible: false,
        dialoginnerVisible: false,
        dialogViewVisible: false,
        weekList: ['日', '一', '二', '三', '四', '五', '六'],
        week: new Array(),
        navYear: '',
        navMonth: '',
        date: new Date(),
        // d: [],
        dateInfo: new Date(),
        nowTime: new Date().toLocaleTimeString('chinese', {hour12: false}),
        notes: [],
        note: '',
        show: false,
        tag: '收入',
        tableData: [{
          id: '1',
          incident: '卖菜',
          money: '10'
        },{
          id: '2',
          incident: '卖菜',
          money: '10'
        }],
        deleteTable: [{
          id: '1',
          incident: '买菜',
          money: '10'
        },{
          id: '2',
          incident: '买菜',
          money: '10'
        }],
        addTotal: 20,
        deleteTotal: 20,
        viewOption: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        },
        chart: null
      }
    },
    watch: {
      dialogViewVisible(to) {
        if(to) {
          this.$nextTick(() => {
            this.initView()
            console.log('chart:'+this.chart)
          })
        } else {
          this.chart.dispose()
        }
      }
    },
    mounted() {
      setInterval(() => {
        this.nowTime = new Date().toLocaleTimeString('chinese', {hour12: false})
      }, 1000)
      this.initDate()
      // this.initView()
    },
    methods: {
      selectedDate(to) {
        this.nowDate = to
      },
      // 上一天
      lastDay() {
        let currentDate = this.dateInfo.getDate()
        this.dateInfo.setDate(--currentDate)
        this.getNote()
      },
      // 下一天
      nextDay() {
        let currentDate = this.dateInfo.getDate()
        this.dateInfo.setDate(++currentDate)
        this.getNote()
      },
      // 上个月
      lastMonth() {
        let currentMonth = this.date.getMonth();
        this.date.setMonth(--currentMonth);
        this.initDate();
      },
      // 下个月
      nextMonth() {
        let currentMonth = this.date.getMonth();
        this.date.setMonth(++currentMonth);
        this.initDate();
      },
      // 上一年
      lastYear() {
        let currentYear = this.date.getFullYear();
        this.date.setYear(--currentYear);
        this.initDate();
      },
      // 下一年
      nextYear() {
        let currentYear = this.date.getFullYear();
        this.date.setYear(++currentYear);
        this.initDate();
      },
      // 日历
      initDate() {
        let month = this.date.getMonth()
        let year = this.date.getFullYear()
        let thisMonthDay = new Date(year, month, 1)
        let thisMonthFirstDay = thisMonthDay.getDay()
        let thisMonthFirstDate = new Date(year, month, -thisMonthFirstDay)
        this.generateTable(thisMonthFirstDate)  //生成日历主体的日期区域
        this.generateNav(year, month) // 导航年/月
      },
      // 生成表格
      generateTable(firstDate) {
        // date 26
        let date = firstDate.getDate()
        for (let i = 0; i < 6; i++) {
          this.week[i] = new Array()
          for (let j = 0; j < 7; j++) {
            firstDate.setDate(++date)
            date = firstDate.getDate()
            this.week[i][j] = new Date(firstDate)
          }
        }
      },
      // 点击日期事件
      generateToday(dateInfo) {
        this.dateInfo = new Date(dateInfo)
        if (this.dateInfo.getMonth()+1<this.navMonth) {
          this.lastMonth()
        } else if (this.dateInfo.getMonth()+1 > this.navMonth) {
          this.nextMonth()
        }
        this.nowDate = this.dateInfo
        this.dialogVisible = true
      },
      // 导航 年/月
      generateNav(year, month) {
        this.navYear = year.toString();
        this.navMonth = (month+1).toString();
      },
      // 收入
      addMoney() {
        this.dialoginnerVisible = true
        this.tag = '收入'
      },
      // 支出
      deleteMoney() {
        this.dialoginnerVisible = true
        this.tag = '支出'
      },
      showView() {
        this.dialogViewVisible = true
      },
      // 图表
      initView() {
        this.chart = Echarts.init(document.getElementById('innerView'))
        this.chart.setOption(this.viewOption)
      }
    },
    components: {
      MonthBill,
      YearBill
    }
  }
</script>

<style lang="stylus">
  #bill
    position relative
    .el-radio-button__inner
      width 100px
    .fontColor
      color #cccccc
    .change
      background-color #cccccc
    .now
      color wheat
      background-color #09315b
    .date
      width 100%
      border 1px solid #cccccc
      .date-header
        display flex
        justify-content space-around
        height 50px
        line-height 50px
        border-bottom 1px solid #cccccc
        span
          font-size 20px
        i
          font-size 50px
          cursor pointer
      .date-body
        padding 10px
        .date-body-header
          display flex
          justify-content space-around
          padding-bottom 10px
          table
            width 100%
            height calc(100vh - 150px)
            tbody
              td
                padding 10px
                border 1px solid #cccccc
              td:hover
                background-color #F2A5A5
                cursor pointer
    .el-dialog__body
      min-height 200px
      .flexBetween
        display flex
        justify-content space-between
        .left
          margin-right 30px
        .kuang
          width 50%
          div:first-child
            text-align center
            margin-bottom 10px
            font-size 20px
            cursor pointer
          .kuang-inner
            border-radius 20px
            border 1px solid #cccccc
            min-height 150px
            box-shadow 4px 4px 10px #cccccc
            .el-table
              margin 0 auto
          .total
            margin-top 10px
            text-align center
            font-size 20px
      .inner-bottom
        margin-bottom 20px
  #innerView
    height 400px
    width 100%
</style>