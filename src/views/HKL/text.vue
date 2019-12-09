<template>
  <div id="text1">
    <div class="select">
      <h5>多选，底下tag显示</h5>
      <div class="flexalign">
        <el-select v-model="value2" multiple placeholder="请选择">
          <span slot="prefix">A</span>
          <span slot="suffix">B</span>
          <el-option
              v-for="item in dcList"
              :key="item.id"
              :label="item.note"
              :value="item.id">
          </el-option>
          <div>
            <el-button>确认</el-button>
            <el-button>取消</el-button>
          </div>
        </el-select>
        <el-select
          v-model="key_dc"
          multiple
          filterable
          @change="changeDc"
          class="margin-b-0-3x width-100"
          placeholder="请选择">
<!--          <div slot="empty" style="padding: 10px">-->
<!--            没选项-->
<!--          </div>-->
          <el-option
            v-for="item in dcList1"
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
      <h5>级联选择</h5>
      <div class="flexalign">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover', multiple: true }"
          @change="handleChange"></el-cascader>
        <div>
          <el-input
            v-model="inputDc"
            placeholder="请输入"
            slot="reference"
            class="input-dc"
            @click="inputclick"></el-input>
          <div class="flexalign">
            <cascader :options="options"></cascader>
<!--            <div class="inputBottom">-->
<!--              <ul v-for="(item, i) in options" :key="i">-->
<!--                <li class="flexaround" @mousemove="childInput(item)" @mouseout="outMouse" @click="clickChild(item)">-->
<!--                  {{item.label}}<i class="el-icon-caret-right"></i>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--            <div class="inputBottom" v-show="childShow">-->
<!--              <ul v-for="(item, i) in childOptions" :key="i">-->
<!--                <li class="flexaround" @mousemove="childInput1(item)" @mouseout="outMouse" @click="clickChild(item)">-->
<!--                  {{item.label}}<i class="el-icon-caret-right"></i>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--            <div class="inputBottom" v-show="childShow1">-->
<!--              <ul v-for="(item, i) in childOptions1" :key="i">-->
<!--                <li class="flexaround">{{item.label}}<i class="el-icon-caret-right"></i></li>-->
<!--              </ul>-->
<!--            </div>-->
          </div>
        </div>
        <el-switch v-model="delivery"></el-switch>
      </div>
      <!--上传附件-->
      <div class="row">
        <div class="col-md-12  col-sm-12">
          <div class="wg-upload">
            <div v-for="(item, index) in uploadFiles" class="wg-upload-item">
              <div class="wg-ui-desc">
                <div class="wg-uid-filename" :title="item.name">{{item.name}}</div>
                <div class="wg-uid-filesize" v-if="item.size!=-1">{{Number(item.size/1024).toFixed(2)}}Kb</div>
                <div class="wg-uid-filesize" v-else>&nbsp;</div>
                <span class="wg-uid-delete" @click="deleteFile(index)">×</span>
              </div>
            </div>
            <!--              <div v-if="percent" style="color: #4cae4c;font-size: 16px">{{percent}}</div>-->
            <div class="wg-upload-desc">请拖拽doc,excel,pptx,png,jpeg,pdf文件到虚线内,15M以内，完成上传</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import JsonUtil from '../../utils/JsonUtil'
  import Cascader from './components/cascader'
  import Axios from 'axios'
  import $ from 'jquery'
  export default {
    name: "text1",
    data() {
      return {
        uploadFiles: [],
        delivery: false,
        showInput: false,
        childShow: false,
        childShow1: false,
        childOptions: [],
        childOptions1: [],
        areaUrl: 'http://192.168.242.104/api/v2/audit/index/territory/tree/list?user=91258506-2397-11e9-94e4-005056ab5a7e',
        value1: '',
        value2: '',
        key_dc: [],
        dcList: [],
        dcList1: [],
        tagsdc: [],
        inputDc: '',
        tag: false,
        temp: [],
        value: [],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      }
    },
    mounted() {
      this.getDcList()
      // this.getAreaOptions()
      this.initDrag()
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
      },
      handleChange() {
        console.log('111')
      },
      // 获取领域选项
      getAreaOptions() {
        Axios
          .get(this.areaUrl)
          .then(res => {
            if (res.result) {
              console.log('res:' + res)
            }
          })
      },
      inputclick() {
        this.showInput = true
      },
      // 鼠标悬停 显示child选项
      childInput(item) {
        this.childShow = true
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
      },
      // 经过对象：dragenter事件，拖放过程中鼠标经过的元素，被拖放的元素“开始”进入其它元素范围内（刚进入）
      // 经过对象：dragover事件，拖放过程中鼠标经过的元素，被拖放的元素正在本元素范围内移动(一直)
      // 经过对象：dragleave事件，拖放过程中鼠标经过的元素，被拖放的元素离开本元素范围
      // 目标地点：drop事件，拖放的目标元素，其他元素被拖放到本元素中
      stopBrowserDrapEvent: function () {
        $(document).on("dragleave dragenter drop dragover", function (e) {
          // 阻止默认事件，但是会发生冒泡 传递到上一层
          e.preventDefault();
          // 阻止事件的冒泡方法，会发生默认事件
          e.stopPropagation();
          // return false 上两种综合
        });
      },
      initDrag() {
        var self = this
        this.stopBrowserDrapEvent();
        // let box = document.getElementById('drop_area'); //拖拽区域
        this.$el.addEventListener("drop", function (e) {
          var fileList = e.dataTransfer.files; //获取文件对象
          e.preventDefault(); //取消默认浏览器拖拽效果
          //检测是否是拖拽文件到页面的操作
          if (fileList.length == 0) {
            return false;
          }
          // //检测文件是不是图片
          // if (fileList[0].type.indexOf('image') === -1) {
          //   alert("您拖的不是图片！");
          //   return false;
          // }
          //拖拉图片到浏览器，可以实现预览功能
          let img = window.URL.createObjectURL(fileList[0]);
          // if (filesize > 512000) {
          //   alert("上传大小不能超过15M.");
          //   return false;
          // }

          var formData = new FormData();
          // formData.append('user', $.cookie('user'));
          formData.append('file', fileList[0]);
          // self.uploadFiles.push({
          //   id: fileList[0].lastModified,
          //   name: fileList[0].name,
          //   size: fileList[0].size
          // })
          console.log('formData:'+formData)
          self.uploadFile(formData);
        }, false);
      },
      uploadFile(formData) {
        var self = this
        console.log(formData)
        var url = 'http://192.168.242.104/api/' + 'common/upload_file'
        $.ajax({
          url: url,
          type: 'post',
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            if (res.result) {
              // self.uploadFiles[self.uploadFiles.length - 1].id = res.id;
              // console.log(self.uploadFiles);
              // console.log(res);
              self.uploadFiles.push({
                id: res.id,
                name: res.name,
                size: -1,
                path: res.path
              });
            } else {
              self.$message({
                showClose: true,
                message: res.detail,
                type: 'warning'
              })

            }
          },
          progress: function (res) {
            console.log(res)
          },
          error: function (res) {
            console.log(res.detail)
          }
        })
      },
      deleteFile(index) {
        this.uploadFiles.splice(index, 1)
      }
    },
    components: {
      Cascader
    }
  }
</script>

<style lang="stylus" scoped>
#text1
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
      i
        line-height 30px
    li:hover
      background-color #cccccc
  .wg-upload {
    border: 1px dashed #ADADAD;
    padding: 20px;
    text-align: center;
    color: #ADADAD;
  }
  .wg-upload .wg-upload-files {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .wg-upload .wg-upload-item {
    width: 180px;
    height: 50px;
    display: inline-flex;
    background: #F4F4F4;
    margin: 0 20px 20px 0;
  }
  .wg-upload .wg-ui-desc {
    padding: 10px;
    width: 135px;
  }
  .wg-upload .wg-ui-desc .wg-uid-filename {
    height: 18px;
    width: 100px;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .wg-upload .wg-ui-desc .wg-uid-filesize {
    height: 18px;
    text-align: start;
  }
  .wg-upload .wg-ui-desc .wg-uid-delete {
    display: block;
    width: 18px;
    height: 18px;
    position: relative;
    right: -98px;
    top: -45px;
    background: #DBDBDB;
    text-align: center;
    line-height: 18px;
    color: #929292;
    font-size: 14px;
    cursor: pointer;
    font-family: '微软雅黑';
  }
</style>