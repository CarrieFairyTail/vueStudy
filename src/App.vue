<template>
  <div id="app">
    <div class="left">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-submenu @click="openpage(m.url)" :index="n+''" v-for="(m,n) in menu" :key="n">
          <template slot="title">
            {{m.name}}
          </template>
          <el-menu-item-group v-if="m.children">
            <el-menu-item
                @click="openpage(p.url)"
                :index="`${n}-${q}`"
                v-for="(p,q) in m.children"
                :key="q"
            >{{p.name}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import JsonUtil from "./utils/JsonUtil";

  export default {
    name: 'APP',
    data() {
      return {
        menu: []
      }
    },
    async mounted() {
      this.menu = (await JsonUtil.get('Menu', 'menu', true)).data;
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      openpage(url) {
        let nowUrl = this.$route.path
        if (url && url!== nowUrl) {
          this.$router.push(url)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  #app
    height calc(100vh - 20px)
    display flex
    justify-content flex-start
    ::-webkit-scrollbar
      display:none
    .left
      width 200px
      height calc(100vh - 20px)
      background-color #545c64
      overflow auto

    .right
      width calc(100% - 200px)
      height calc(100vh - 20px)
</style>