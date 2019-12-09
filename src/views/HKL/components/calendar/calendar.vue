<template>
  <div id="calendar">
    <div class="date">
      <div class="date-header">
        <i class="el-icon-arrow-left" @click="lastYear"></i>
        <i class="el-icon-arrow-left" @click="lastMonth"></i>
        <span id="year">{{navYear}}</span>
        <span id="month">{{navMonth}}</span>
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
                {'fontColor': t.getMonth() !== date.getMonth()}]">{{t.getDate()}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="date-foot">
        {{nowTime}}
      </div>
    </div>
  </div>
</template>

<script>
import JsonUtil from '../../../../utils/JsonUtil'
export default {
    name: "calendar",
    data() {
      return {
        value1: '',
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
        show: false
      }
    },
    mounted() {
      setInterval(() => {
        this.nowTime = new Date().toLocaleTimeString('chinese', {hour12: false})
      }, 1000)
      this.initDate()
    },
    methods: {
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
        this.getNote()
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
        this.getNote()
        this.$emit('selectedDate', dateInfo)
      },
      // 导航 年/月
      generateNav(year, month) {
        this.navYear = year.toString();
        this.navMonth = (month+1).toString();
      },
      // 备忘
      getNote() {
        JsonUtil.get('hklview')
          .then(res => {
            if (res.result) {
              this.notes = res.data
              this.note = ''
              this.notes.forEach(item => {
                if (item.date == this.dateInfo.toLocaleDateString()) {
                  this.note = item.note
                }
              })
            }
          })
      }
    }
  }
</script>

<style lang="stylus">
#calendar
  position relative
  .fontColor
    color #cccccc
  .change
    background-color #cccccc
  .now
    background-color aquamarine
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
        border-bottom 1px solid #cccccc
        table
          tbody
            td
              padding 5px
              border 1px solid #cccccc
            td:hover
              background-color #cccccc
              cursor pointer
    .date-foot
      text-align center
      height 50px
      line-height 50px
</style>