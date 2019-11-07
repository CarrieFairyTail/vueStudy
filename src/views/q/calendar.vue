<template>
    <div id="contain">
        <div id="calendar">
            <div id="header">
                <i class="fa fa-chevron-left fa-2x leftTurn" aria-hidden="true" v-on:click="changeYear(-1)"></i>
                <i class="fa fa-chevron-left fa-2x leftTurn" aria-hidden="true" v-on:click="changeMonth(-1)"></i>
                <span style="margin: 5px;font-size: large"><b>{{selectDate.getFullYear()}}</b></span>
                <span style="margin: 5px;font-size: large"><b>{{selectDate.getMonth() + 1}}</b></span>
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
                         today: new Date().getFullYear() === selectDate.getFullYear() && new Date().getMonth() === selectDate.getMonth() && new Date().getDate() === item.data && item.type === 0,
                         selectDay: item.data === selectDate.getDate() && item.type === 0}">
                        {{item.data}}
                    </div>
                </div>
            </div>
            <div id="footer">
                {{currentTime}}
            </div>
        </div>

        <div id="side">
            <div id="side_inner" :style="{marginLeft: hide ? '369px' : '0'}">
                <div id="move_button" v-on:click="hide = !hide">
                    <i class="fa fa-angle-double-right fa-2x" v-if="!hide" aria-hidden="true"></i>
                    <i class="fa fa-angle-double-left fa-2x" v-if="hide" aria-hidden="true"></i>
                </div>
                <div id="memorandum">
                    <div id="date">
                        <div style="width: 100%; height: 100px; border-bottom: 1px solid #cccccc;font-size: x-large;line-height:100px;">
                            <b>{{selectDate.getFullYear()}} 年 {{selectDate.getMonth()+1}} 月 {{selectDate.getDate()}} 日</b>
                        </div>
                        <div style="width: 100%; height: 49px;line-height:49px;background-color: #ecf5ff; color: #cccccc;font-size: large">
                            农历 {{lunar.string.split(' ')[1]}}
                        </div>
                    </div>
                    <div id="note">
                        <div id="changeDate" style="height: 40px;">
                            <el-button style="float: left" type="primary" plain v-on:click="changeDate(-1)">前一天</el-button>
                            <el-button style="float: right" type="primary" plain v-on:click="changeDate(1)">后一天</el-button>
                        </div>
                        <div id="content">
                            <b><p v-for="item in calendar" :key="'k' + item">{{item}}</p></b>
                        </div>
                    </div>
                </div>
            </div>
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

    #side {
        width: 400px;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        overflow:hidden;
    }
    #side_inner {
        width:100%;
        height:100%;
        margin-left: 0;
        transition:margin-left 1.5s;
        -webkit-transition:margin-left 1.5s;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    #move_button {
        width: 30px;
        height: 100px;
        border: 1px solid #cccccc;
        border-right: 1px solid #ffffff;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    #move_button:hover{
        color: aqua;
    }
    #memorandum {
        width: 369px;
        height: 100%;
        border-left: 1px solid #cccccc;
        text-align: center;
    }

    #date {
        width: 90%;
        height: 150px;
        border: 1px solid #cccccc;
        margin-top: 20px;
        margin-left: 5%;
    }
    #note {
        width: 90%;
        height: 100%;
        margin-top: 20px;
        margin-left: 5%;
    }
    #content {
        width: 100%;
        height: 100%;
        border: 1px solid #cccccc;
    }
</style>