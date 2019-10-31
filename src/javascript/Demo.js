import JsonUtil from '../../JsonUtil'
export default {
  data () {
    return {
      data: {},
      form: {},
      editDialog: false
    }
  },
  async mounted () {
    this.data = await JsonUtil.get('note')
  },
  methods: {
    async del (id) {
      await JsonUtil.delete('note', id)
      this.data = await JsonUtil.get('note')
    },
    async get (id) {
      this.form = JSON.parse(JSON.stringify(await JsonUtil.getById('note', id)))
      this.editDialog = true
    },
    async edit () {
      await JsonUtil.update('note', this.form)
      this.editDialog = false
      this.data = await JsonUtil.get('note')
    }
  }
}
