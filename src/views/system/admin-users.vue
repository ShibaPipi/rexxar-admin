<template>
  <div class="app-container">
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">新用户</el-button>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="storeLoading" type="primary" @click="submitForm()">确 定</el-button>
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
        label="用户名"
        width="100"
      />
      <el-table-column
        prop="introduction"
        label="介绍"
      />
      <el-table-column
        prop="last_login_at"
        label="上次登录时间"
        width="120"
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="180"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'admin_user_roles', params: { id: scope.row.id } }">
            <el-button
              type="text"
              size="small"
            >
              管理员用户角色
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, store } from '@/api/system/admin-user'

export default {
  name: 'AdminUsers',
  data() {
    return {
      listLoading: false,
      storeLoading: false,
      list: [],
      dialogFormVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
    async handleStoreAdminUser() {
      this.storeLoading = true
      await store(this.form)
      this.storeLoading = false
      await this.getList()
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleStoreAdminUser()
          this.dialogFormVisible = false
          this.form.name = ''
          this.form.password = ''
        } else {
          console.log('提交失败！！')
          return false
        }
      })
    }
  }
}
</script>
