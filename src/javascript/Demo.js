import JsonUtil from '../utils/JsonUtil'

export default {
    data() {
        return {
            data: [],
            form: {},
            editDialog: false
        }
    },
    async mounted() {
        this.data = (await JsonUtil.get('note')).data;
    },
    methods: {
        async del(id) {
            await JsonUtil.delete('note', id);
            this.data = (await JsonUtil.get('note')).data;
        },
        async get(id) {
            this.form = (await JsonUtil.getById('note', id)).data;
            this.editDialog = true
        },
        async edit() {
            await JsonUtil.update('note', this.form);
            this.editDialog = false
            this.data = (await JsonUtil.get('note')).data;
        },
        async add() {
            await JsonUtil.add('note', this.form);
            this.editDialog = false
            this.data = (await JsonUtil.get('note')).data;
        }
    }
}
