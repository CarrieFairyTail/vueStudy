<template>
  <div id="home">
    <el-carousel type="card" height="400px">
      <el-carousel-item>
        <div><img src="../../plugins/images/yun.jpg" height="400px" alt=""></div>
      </el-carousel-item>
      <el-carousel-item>
        <div><img src="../../plugins/images/zhuo.jpg" height="400px" alt=""></div>
      </el-carousel-item>
      <el-carousel-item>
        <div><img src="../../plugins/images/zhuo.jpg" height="400px" alt=""></div>
      </el-carousel-item>
    </el-carousel>
    <div class="home-mid">
      <div>项目</div>
      <div>账单</div>
      <div>更多</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home"
  }
</script>

<style lang="stylus" scoped>
  .el-carousel__item
    div
      text-align center
  .home-mid
    display flex
    justify-content space-between
    div
      width 30%
      height 200px
      line-height 200px
      text-align center
      border 1px solid #cccccc
      border-radius 20px
      box-shadow 4px 4px 10px #cccccc
      color wheat
      font-size 40px
      background-color #09315B
      cursor pointer
    div:hover
      opacity 70%
</style>