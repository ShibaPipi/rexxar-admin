<template>
  <div class="app-container">
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">新专题</el-button>
    <el-dialog title="新专题" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="newTopicLoading" type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        prop="name"
        label="专题名称"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteTopic(scope.row)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, storeTopic, deleteTopic } from '@/api/topic'

export default {
  name: 'Topics',
  data() {
    return {
      listLoading: true,
      newTopicLoading: false,
      listQuery: {},
      list: [],
      dialogFormVisible: false,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      this.list = (await fetchList()).data.data
      this.listLoading = false
    },
    async handleStoreTopic() {
      this.newTopicLoading = true
      await storeTopic(this.form)
      this.newTopicLoading = false
      await this.getList()
    },
    async deleteTopic(row) {
      await deleteTopic(row)
      await this.getList()
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleStoreTopic()
          this.dialogFormVisible = false
          this.form.name = ''
        } else {
          console.log('提交失败！！')
          return false
        }
      })
    }
  }
}
</script>
