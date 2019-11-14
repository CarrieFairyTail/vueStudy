<template>
  <div id="hklView">
    <div class="flexalign">
      <div class="left">
        <div class="date">
          <h5>示例</h5>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <div style="font-size: 12px">{{value1}}</div>
        </div>
        <div class="left">
          <h5>日历</h5>
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
      </div>
      <h5>彩蛋</h5>
      <div class="right">
        <div class="flexitem">
          <div class="hidden" @click="show=!show">
            <i class="el-icon-arrow-left" style="font-size: 30px" v-show="!show"></i>
            <i class="el-icon-arrow-right" style="font-size: 30px" v-show="show"></i>
          </div>
          <transition name="show">
            <div v-show="show" class="right-context">
              <div class="top-date">
                <div class="top-date-t">{{dateInfo.toLocaleDateString()}}</div>
                <div class="top-date-b">农历</div>
              </div>
              <div class="flexaround">
                <div @click="lastDay">前一天</div>
                <div @click="nextDay">后一天</div>
              </div>
              <div class="bottom-text">
                {{note}}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../javascript/hklCalendar.js"></script>

<style lang="stylus">
#hklView
  position relative
  padding 20px
  .fontColor
    color #cccccc
  .change
    background-color #cccccc
  .now
    background-color aquamarine
  .date
    margin-right 20px
  .flexalign
    display flex
    justify-content flex-start
    .left
      width 50%
      .date
        width 350px
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
                  padding 10px
                  border 1px solid #cccccc
                td:hover
                  background-color #cccccc
                  cursor pointer
        .date-foot
          text-align center
          height 50px
          line-height 50px
    .right
      display flex
      justify-content flex-end
      float right
      width 50%
      height calc(100vh - 60px)
      overflow hidden
      .hidden
        width: 30px
        height 60px
        line-height 75px
        border 1px solid #cccccc
        float right
      .flexitem
        display flex
        align-items center
        float right
        width 200px
        .right-context
          position relative
          .top-date
            border 1px solid #cccccc
            margin-bottom 10px
            text-align center
            .top-date-t
              height 40px
              line-height 40px
              font-weight 700
              border-bottom 1px solid #cccccc
            .top-date-b
              height 20px
          .bottom-text
            height calc(100vh - 300px)
            border 1px solid #cccccc
          .flexaround
            display flex
            justify-content space-between
            div
              border 1px solid #cccccc
              padding 5px 10px
              border-bottom none
              cursor pointer
        @keyframes show {
          0% {
            /*opacity: 0;*/
            right -178px
          }
          100% {
            /*opacity: 1;*/
            right 0px
          }
        }
        @keyframes hide {
          0% {
            /*opacity: 1;*/
            right 0px
          }
          100% {
            /*opacity: 0;*/
            right -198px
          }
        }
        .show-enter-active {
          animation: show 2s;
        }
        .show-leave-active {
          animation: hide 2s;
        }
        .show-enter, .show-leave-to {
          /*opacity: 0;*/
        }
</style>