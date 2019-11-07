import JsonUtil from '../utils/JsonUtil'

export default {
  name: "hklDate",
  data() {
    return {
      tableData: [],
      title: '标题',
      height: window.innerHeight - 100,
      dialogVisible: false,
      form: {},
      deleteId: '',
      isAdd: false,
      isSearch: false,
      isEdit: false,
      isDelete: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    addNew() {
      this.isAdd = true
      this.dialogVisible = true
    },
    getList() {
      JsonUtil.get('note')
        .then(res => {
          if (res.result) {
            this.tableData = res.data
          }
        })
    },
    show(o) {
      JsonUtil.getById('note', o)
        .then(res => {
          if (res.result) {
            this.form = res.data
          }
        })
    },
    search(o) {
      this.dialogVisible = true
      this.isSearch = true
      this.title = '查看详情'
      this.show(o)
    },
    edit(o) {
      this.dialogVisible = true
      this.isEdit = true
      this.title = '编辑详情'
      this.show(o)
    },
    deleteDate(o) {
      this.dialogVisible = true
      this.isDelete = true
      this.show(o)
      this.title = '确认要删除吗？'
      this.deleteId = o
    },
    close() {
      this.dialogVisible = false
      this.isDelete = false
      this.isEdit = false
      this.isSearch = false
      this.isAdd = false
      this.form = {}
    },
    submitAdd() {
      JsonUtil.add('note', this.form)
        .then(res => {
          if (res.result) {
            this.getList()
            this.$message({
              message: '创建成功！',
              type: 'success'
            });
          }
        })
      this.close()
    },
    submitEdit() {
      JsonUtil.update('note', this.form)
        .then(res => {
          if (res.result) {
            this.getList()
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
          }
        })
      this.close()
    },
    submitDelete() {
      JsonUtil.delete('note', this.deleteId)
        .then(res => {
          if (res.result) {
            this.getList()
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          }
        })
      this.close()
    }
  }
}