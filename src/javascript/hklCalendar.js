import JsonUtil from '../utils/JsonUtil'
import calendar from '../views/HKL/components/calendar/calendar.vue'

export default {
  name: "hklView",
  data() {
    return {
      value1: '',
      // value2: '',
      // key_dc: [],
      // dcList: [],
      // tagsdc: [],
      // inputDc: '',
      // tag: false,
      // temp: [],
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      week: new Array(),
      navYear: '',
      navMonth: '',
      // weekNum: 0,
      date: new Date(),
      // d: [],
      dateInfo: new Date(),
      // nowYear: new Date().getFullYear(),
      // nowMonth: new Date().getMonth() + 1,
      // nowDate: new Date().getDate(),
      nowTime: new Date().toLocaleTimeString('chinese', {hour12: false}),
      // nowHour: new Date().getHours(),
      // nowMinutes: new Date().getMinutes(),
      // nowSeconds: new Date().getSeconds(),
      // month: new Date().getMonth(),
      // year: new Date().getFullYear(),
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
      console.log('monthday:' + thisMonthDay)
      let thisMonthFirstDay = thisMonthDay.getDay()
      console.log('monthfirstday:' + thisMonthFirstDay)
      let thisMonthFirstDate = new Date(year, month, -thisMonthFirstDay)
      console.log('first:' + thisMonthFirstDate)
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
      // console.log('datainfo:'+ this.dateInfo.getMonth()+1+'navMonth:'+this.navMonth)
      if (this.dateInfo.getMonth()+1<this.navMonth) {
        this.lastMonth()
      } else if (this.dateInfo.getMonth()+1 > this.navMonth) {
        this.nextMonth()
      }
      this.getNote()
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
  },
  components: {
    calendar
  }
}