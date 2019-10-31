<template>
  <div style="margin: 0 auto;width:70%;border: 1px solid #ccc">
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="get(scope.row.id)"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="editDialog" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="form.id" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../javascript/Demo.js"></script>
