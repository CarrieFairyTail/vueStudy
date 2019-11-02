// import JsonUtil from "../../utils/JsonUtil";

export default {
    data () {
        return {
            title: ['一', '二', '三', '四', '五', '六', '七'],
            calendarArray: [],
            todayYear: new Date().getFullYear(),
            todayMonth: new Date().getMonth() + 1,
            todayDate: new Date().getDate(),
            selectYear: this.todayYear,
            selectMonth: null,
            selectDate: null,
            currentTime: new Date().toLocaleTimeString('chinese', { hour12: false }).replace(/:/g, ' : ')
        }
    },
    mounted () {
        this.initData();
        this.selectYear = this.todayYear;
        this.selectMonth = this.todayMonth;
        this.selectDate = this.todayDate;
        setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString('chinese', { hour12: false }).replace(/:/g, ' : ');
        }, 1000);

    },
    methods: {
        initData(date=new Date()) {
            this.calendarArray = [];
            const monthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const preMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
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

        calcMonth(num) {
            this.selectMonth = this.selectMonth + num;
            if (this.selectMonth === 13) {
                this.selectMonth = 1;
                this.selectYear++;
            }
            if (this.selectMonth === 0) {
                this.selectMonth = 12;
                this.selectYear--;
            }
        },

        selectDay(day) {
            this.calcMonth(day.type);
            this.selectDate = day.data;
            if(day.type !== 0) {
                this.initData(new Date(this.selectYear, this.selectMonth-1, this.selectDate));
            }
        },

        changeMonth(num) {
            this.calcMonth(num);
            this.initData(new Date(this.selectYear, this.selectMonth-1, this.selectDate));
        },

        changeYear(num) {
            this.selectYear = this.selectYear + num;
            this.initData(new Date(this.selectYear, this.selectMonth-1, this.selectDate));
        }
    }
}