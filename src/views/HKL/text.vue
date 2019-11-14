<template>
  <div id="text">
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
</template>

<script>
  import JsonUtil from '../../utils/JsonUtil'
  export default {
    name: "text",
    data() {
      return {
        value1: '',
        value2: '',
        key_dc: [],
        dcList: [],
        tagsdc: [],
        inputDc: '',
        tag: false,
        temp: []
      }
    },
    mounted() {
      this.getDcList()
    },
    methods: {
      // 获取数据中心
      getDcList() {
        JsonUtil.get('note')
          .then(res => {
            if (res.result) {
              this.dcList = res.data
            }
          })
      },
      // 处理添加数据中心
      handleClosedc(tag) {
        this.tagsdc.splice(this.tagsdc.indexOf(tag.id), 1);
        this.key_dc.splice(this.key_dc.indexOf(tag.id), 1)
        //   this.changeDc(this.key_dc)
      },
      changeDc(to) {
        let name = []
        const a = new Map()
        this.dcList.forEach((item) => {
          a.set(item.id, item.name)
        })
        to.forEach(o => {
          name.push({id: o, name: a.get(o)})
        })
        this.tagsdc = name
      },
      selectV(v) {
        let divAll = this.$refs.divinner
        divAll.forEach(item => {
          if (item.tag == true && item.id == v.id) {
            item.style.color = '#606266'
            item.tag = false
          } else if (item.id == v.id) {
            item.style.color = '#bd2312'
            item.name = v.note
            item.tag = true
          }
        })
        this.temp = divAll.filter(item => {
          return item.tag == true
        })
        // this.temp.push({
        //   id: v.id,
        //   dc_name_inner_short: v.dc_short_name,
        //   tag: item.tag
        // })
        this.tagsdc = this.temp
      }
    }
  }
</script>

<style lang="stylus" scoped>
#text
  padding 20px
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
  .flexalign
    display flex
    justify-content flex-start
</style>