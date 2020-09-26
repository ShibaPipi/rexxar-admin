<template>
  <div class="app-container">
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增通知</el-button>
    <el-dialog title="新增通知" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
          <el-input v-model="form.content" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="newNoticeLoading" type="primary" @click="submitForm()">确 定</el-button>
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
        prop="title"
        label="通知标题"
      />
      <el-table-column
        prop="id"
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, storeNotice, deleteNotice } from '@/api/notice'

export default {
  name: 'Notices',
  data() {
    return {
      listLoading: true,
      newNoticeLoading: false,
      listQuery: {},
      list: [],
      dialogFormVisible: false,
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
    async handleStoreNotice() {
      this.newNoticeLoading = false
      await storeNotice(this.form)
      this.newNoticeLoading = true
      await this.getList()
    },
    deleteRow() {
      this.$alert('暂未开放该功能', '通知', {
        confirmButtonText: '确定'
      })
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleStoreNotice()
          this.dialogFormVisible = false
          this.form.title = ''
          this.form.content = ''
        } else {
          console.log('提交失败！！')
          return false
        }
      })
    }
  }
}
</script>
