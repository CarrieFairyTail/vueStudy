<template>
  <div id="hklDate">
    <h3 style="text-align: center">Carrie的行程安排(feature)
      <el-button type="text" @click="addNew">+ 添加行程</el-button>
    </h3>
    <el-table
        border
        :data="tableData"
        :height="height"
        style="width: 80%">
      <el-table-column
          prop="date"
          label="日期">
      </el-table-column>
      <el-table-column
          prop="note"
          label="事项">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="search(scope.row.id)">查看</el-button>
          <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="deleteDate(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        :title="title"
        width="40%"
        @close="close"
        :visible.sync="dialogVisible">
      <el-form ref="form" :model="form">
        <div>
          <div style="margin-bottom: 15px">日期：
            <el-input v-model="form.date" :disabled="isSearch || isDelete"></el-input>
          </div>
          <div>事项：
            <el-input v-model="form.note" :disabled="isSearch || isDelete"></el-input>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="!isSearch || isEdit || isDelete">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitEdit" v-if="isEdit">确 定</el-button>
        <el-button type="primary" @click="submitDelete" v-if="isDelete">确 定</el-button>
        <el-button type="primary" @click="submitAdd" v-if="isAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../javascript/hklDate.js"></script>

<style lang="stylus" scoped>
  #hklDate
    .el-table
      margin 0 auto
</style>