<template>
  <div>
    <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
    <div class="flexalign">
      <div class="left">
        <h5>日历</h5>
        <div class="date">
          <div class="date-header">
            <i class="el-icon-arrow-left"></i>
            <i class="el-icon-arrow-left"></i>
            <span>{{year}}</span>
            <span>{{month}}</span>
            <i class="el-icon-arrow-right"></i>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="date-body">
            <div class="date-body-header">
              <div>日</div>
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div>六</div>
            </div>
          </div>
          <div class="data-foot">

          </div>
        </div>
      </div>
      <div class="right">
        需要滑动
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hklView",
    data() {
      return {
        value1: '',
        year: '2019年',
        month: '01月'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .flexalign
    padding 20px
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
        .date-body
          .date-body-header
            display flex
            justify-content space-around
            padding 10px 0
    .right
      width 200px
      /*border 1px solid #cccccc*/
</style>