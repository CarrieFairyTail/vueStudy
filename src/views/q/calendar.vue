<template>
    <div id="contain">
        <div id="calendar">
            <div id="header">
                <i class="fa fa-chevron-left fa-2x leftTurn" aria-hidden="true" v-on:click="changeYear(-1)"></i>
                <i class="fa fa-chevron-left fa-2x leftTurn" aria-hidden="true" v-on:click="changeMonth(-1)"></i>
                <span style="margin: 5px;font-size: large"><b>{{selectYear}}</b></span>
                <span style="margin: 5px;font-size: large"><b>{{selectMonth}}</b></span>
                <i class="fa fa-chevron-right fa-2x rightTurn" aria-hidden="true" v-on:click="changeYear(1)"></i>
                <i class="fa fa-chevron-right fa-2x rightTurn" aria-hidden="true" v-on:click="changeMonth(1)"></i>
            </div>
            <div id="main">
                <div v-for="(t, i) in title" :key="'t' + i" class="title">
                    <b>{{t}}</b>
                </div>
                <div v-for="(calendar, index) in calendarArray" :key="index" class="week">
                    <div v-for="(item, i) in calendar" :key="i" class="day" v-on:click="selectDay(item)"
                         :class="{grayFont: item.type !== 0,
                         today: selectYear === todayYear && selectMonth === todayMonth && item.data === todayDate && item.type === 0,
                         selectDay: item.data === selectDate && item.type === 0}">
                        {{item.data}}
                    </div>
                </div>
            </div>
            <div id="footer">
                {{currentTime}}
            </div>
        </div>

        <div id="memorandum">

        </div>
    </div>
</template>

<script src="../../javascript/q/calendar.js"></script>

<style>
    #calendar {
        margin: 0 auto;
        width: 350px;
        border: 1px solid #888888;
    }
    #header {
        width: 350px;
        height: 50px;
        border-bottom: 1px solid #888888;
        display: table-cell;
        vertical-align:middle;
        text-align: center;
    }
    #main {
        margin: 5px 0;
        width: 350px;
        height: 350px;
    }
    #footer {
        border-top: 1px solid #888888;
        width: 350px;
        height: 80px;
        display: table-cell;
        vertical-align:middle;
        text-align: center;
        font-size: xx-large;
    }
    .week {
        width: 350px;
    }
    .day, .title {
        border: 1px solid #ffffff;
        text-align: center;
        width: 48px;
        height:48px;
        display: table-cell;
        vertical-align:middle
    }
    .day:hover {
        border: 1px solid #cccccc;
    }
    .grayFont {
        color:#cccccc;
    }
    .today {
        background-color: lightcyan;
    }
    .selectDay {
        border: 1px solid #cccccc;
    }
    .leftTurn {
        margin: 0 20px;
        float: left;
        color: darkturquoise;
    }
    .rightTurn {
        padding: 0 20px;
        float: right;
        color: darkturquoise;
    }
    i:hover{
        color: aqua;
    }
</style>