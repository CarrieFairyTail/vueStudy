<template>
  <div id="hklView">
    <div class="flexalign">
      <div class="left">
        <div>
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
                      <td v-for="(t, n) in week[i]" :key="n" @click="generateToday(t)" @dblclick="doubleClick"
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
<!--  :class="[show ? '' : 'move']" -->
      <div class="right" :style="{right: show ? '' : '-168px'}">
        <div class="flexitem">
          <div class="hidden" @click="show=!show">
            <i class="el-icon-arrow-left" style="font-size: 30px" v-show="!show"></i>
            <i class="el-icon-arrow-right" style="font-size: 30px" v-show="show"></i>
          </div>
          <div class="right-context">
            <div class="top-date">
              <div class="top-date-t">{{dateInfo.toLocaleDateString()}}</div>
              <div class="top-date-b">农历</div>
            </div>
            <div class="flexaround">
              <div @click="lastDay">前一天</div>
              <div @click="nextDay">后一天</div>
            </div>
            <div class="bottom-text">
              <div v-for = "(item, i) in note" :key="i">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dateInfo.toDateString()"
      :visible.sync="dialogNoteVisible"
      width="30%">
      <div v-for = "(item, i) in note" :key="i">
        {{i+1}}.{{item.value}}
        <i class="el-icon-remove-outline deleteIcon"></i>
      </div>
      <el-input placeholder="添加备忘录"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNoteVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogNoteVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../javascript/hklCalendar.js"></script>

<style lang="stylus">
#hklView
  position relative
  padding 20px
  .fontColor
    color #999
  .change
    background-color #cccccc
  .now
    background-color aquamarine
  .date
    margin-right 20px
  .flexalign
    display flex
    justify-content space-between
    position relative
    overflow hidden
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
                  background-color lightgray
                  cursor pointer
        .date-foot
          text-align center
          height 50px
          line-height 50px
    .right
      display flex
      justify-content flex-end
      right 0px
      transition right 1.5s
      -webkit-transition right 1.5s
      height calc(100vh - 60px)
      overflow hidden
      position relative
      .hidden
        width: 30px
        height 60px
        line-height 75px
        border 1px solid #cccccc
        border-right none
        float right
      .flexitem
        display flex
        align-items center
        float right
        width 200px
        .right-context
          width 200px
          position relative
          border 1px solid #cccccc
          padding 5px
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
    .move
      right -168px
  .deleteIcon
    color brown
    cursor pointer
</style>