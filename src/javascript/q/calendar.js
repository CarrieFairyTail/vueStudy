import JsonUtil from "../../utils/JsonUtil";
import DateUtil from "../../utils/DateUtil";
import moment from 'moment';

export default {
    data () {
        return {
            title: ['一', '二', '三', '四', '五', '六', '日'],
            calendarArray: [],
            selectDate: new Date(),
            currentTime: new Date().toLocaleTimeString('chinese', { hour12: false }).replace(/:/g, ' : '),
            hide: false,
            calendar: [],
        }
    },
    computed: {
        lunar() {
            return DateUtil.GetLunarDay(this.selectDate.getFullYear(), this.selectDate.getMonth()+1, this.selectDate.getDate());
        }
    },
    mounted () {
        this.initData();
        setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString('chinese', { hour12: false }).replace(/:/g, ' : ');
        }, 1000);
    },
    methods: {
        initData() {
            this.calendarArray = [];
            const monthFirstDay = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth(), 1);
            const monthLastDay = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth() + 1, 0);
            const preMonthLastDay = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth(), 0);
            let firstDayWeek = (monthFirstDay.getDay() === 0 ? 7 : monthFirstDay.getDay()) - 1;
            let eachRow = Array(7).fill(0);
            let index = 0;
            // 上个月
            for(let i = preMonthLastDay.getDate() - (firstDayWeek === 0 ? 7 : firstDayWeek) + 1; i <= preMonthLastDay.getDate(); i++) {
                eachRow[index++] = {type: -1, data: i};
                if (index >= eachRow.length) {
                    this.calendarArray.push(JSON.parse(JSON.stringify(eachRow)));
                    eachRow = Array(7).fill(0);
                }
            }
            // 当月
            for(let i = 1; i <= monthLastDay.getDate(); i++) {
                eachRow[firstDayWeek++] = {type: 0, data: i};
                if (firstDayWeek >= eachRow.length) {
                    firstDayWeek = 0;
                    this.calendarArray.push(JSON.parse(JSON.stringify(eachRow)));
                    eachRow = Array(7).fill(0);
                }
                // 下月
                if (i === monthLastDay.getDate()) {
                    let more = 1;
                    let j = 1;
                    while(more++ <= 6 - this.calendarArray.length + 1) {
                        for (; firstDayWeek < eachRow.length; j++) {
                            eachRow[firstDayWeek++] = {type: 1, data: j};
                        }
                        this.calendarArray.push(JSON.parse(JSON.stringify(eachRow)));
                        firstDayWeek = 0;
                        eachRow = Array(7).fill(0);
                    }
                }
            }
        },

        selectDay(day) {
            this.selectDate = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth() + day.type, day.data);
        },

        changeMonth(num) {
            const maxDate = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth() + num + 1, 0).getDate();
            this.selectDate = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth() + num, maxDate > this.selectDate.getDate() ? this.selectDate.getDate() : maxDate);
        },

        changeYear(num) {
            this.selectDate = new Date(this.selectDate.getFullYear() + num, this.selectDate.getMonth(), this.selectDate.getDate());
        },

        changeDate(num) {
            this.selectDate = new Date(this.selectDate.getFullYear(), this.selectDate.getMonth(), this.selectDate.getDate() + num);
        }
    },
    watch: {
        selectDate: function (newValue, oldValue) {
            if (newValue.getFullYear() !== oldValue.getFullYear() || newValue.getMonth() !== oldValue.getMonth()) {
                this.initData();
            }
            this.calendar = [];
            JsonUtil.get('calendar').then(res => {
                if (res.result) {
                    res.data.forEach(item => {
                        let now = null;
                        switch (item.type) {
                            case '1': now = this.selectDate;break;
                            case '2': now = new Date(this.lunar.format);break;
                        }
                        if (now !== null && item.date === moment(now).format(item.format)) {
                            this.calendar.push(item.calendar);
                        }
                    })
                }
            })
        }
    }
}