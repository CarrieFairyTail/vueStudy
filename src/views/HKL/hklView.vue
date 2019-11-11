<template>
  <div id="hklView">
    <div class="flexalign">
      <div class="date">
        <h5>示例</h5>
        <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        {{value1}}
      </div>
      <div class="select">
        <h5>多选，底下tag显示</h5>
        <div class="flexalign">
          <el-select v-model="value2" multiple placeholder="请选择">
            <el-option
                v-for="item in dcList"
                :key="item.id"
                :label="item.note"
                :value="item.id">
            </el-option>
          </el-select>
          <el-select
              v-model="key_dc"
              multiple
              filterable
              @change="changeDc"
              class="margin-b-0-3x width-100"
              placeholder="请选择">
            <el-option
                v-for="item in dcList"
                :key="item.id"
                :label="item.note"
                :value="item.id">
            </el-option>
          </el-select>
          <el-popover
                placement="bottom"
                width="200"
                trigger="click">
              <div v-for="(v, k) in dcList" :id="v.id" :key="k" @click="selectV(v)" ref="divinner">
                {{v.note}}
              </div>
              <el-input
                  v-model="inputDc"
                  placeholder="请输入"
                  slot="reference"
                  class="input-dc"
              ></el-input>
            </el-popover>
        </div>
        <div>
          <el-tag
              v-for="tag in tagsdc"
              :key="tag.name"
              closable
              :type="tag.type"
              @close="handleClosedc(tag)">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
    </div>
    <div class="flexalign">
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
                    {'change': t.toDateString()===dateInfo.toDateString()}]">{{t.getDate()}}</td>
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
      <div class="right">
        <h5>彩蛋</h5>
        <div class="flexitem">
          <div style="width: 20px;height: 407px;line-height: 407px;border-right: 1px solid #ccc" @click="show=!show">
            <i class="el-icon-arrow-left" style="font-size: 30px"></i>
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
  padding 20px
  .change
    background-color #cccccc
  .now
    background-color aquamarine
  .el-select .el-select__tags>span
    display: none!important
  .el-input
    width 200px
  .el-popover
    max-height 200px
    overflow-y auto
    div
      height 30px
    div:hover
      background-color #cccccc
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
      width 200px
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
      height 300px
  .flexaround
    display flex
    justify-content space-between
    div
      border 1px solid #cccccc
      padding 5px 10px
      border-bottom none
      cursor pointer
  .bottom-text
    border 1px solid #cccccc
  .flexitem
    display flex
    align-items center
    float right
  .right-context
    position relative
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
      right -178px
    }
  }
  .show-enter-active {
    animation: show 1s;
  }
  .show-leave-active {
    animation: hide 1s;
  }
  .show-enter, .show-leave-to {
    opacity: 0;
  }
</style>