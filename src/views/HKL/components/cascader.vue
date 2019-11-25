<template>
  <div class="inputBottom">
    <ul v-for="(item, i) in options" :key="i">
      <li class="flexaround" @mousemove="childInput(item)" @mouseout="outMouse" @click="clickChild(item)">
        {{item.label}}<i class="el-icon-caret-right"></i>
        <div class="innerInput" v-show="childShow1">
          <ul v-for="(item, i) in childOptions" :key="i">
            <li class="flexaround" @mousemove="childInput1(item)" @mouseout="outMouse" @click="clickChild(item)">
              {{item.label}}<i class="el-icon-caret-right"></i>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'cascader',
    props: {
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        childShow: false,
        childShow1: false,
        childOptions: [],
        childOptions1: []
      }
    },
    methods: {
      // 鼠标悬停 显示child选项
      childInput(item) {
        this.childShow1 = true
        this.childOptions = item.children
      },
      childInput1(item) {
        this.childShow1 = true
        this.childOptions1 = item.children
      },
      // 鼠标移开 child隐藏
      outMouse() {
        // this.childShow = false
      },
      // 鼠标点击 选中当前选项
      clickChild(item) {
        console.log('item' + JSON.stringify(item))
      }
    }
  }
</script>

<style lang="stylus" scoped>
.flexaround
  display flex
  justify-content space-between
.inputBottom
  width 200px
  padding 20px
  border 1px solid #cccccc
  li
    height 30px
    line-height 30px
    cursor pointer
    position relative
    i
      line-height 30px
    .innerInput
      position absolute
      width 200px
      padding 20px
      border 1px solid #cccccc
      left 240px
  li:hover
    background-color #cccccc
</style>