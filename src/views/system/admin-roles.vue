<template>
  <div class="app-container">
    <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增角色</el-button>
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="角色名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input v-model="form.description" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="storeLoading" type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :v-loading="listLoading"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        prop="name"
        label="用户角色名"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <router-link :to="{ name: 'admin_role_permissions', params: { id: scope.row.id } }">
            <el-button
              type="text"
              size="small"
            >
              管理员角色权限
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, store } from '@/api/system/admin-role'

export default {
  name: 'AdminRoles',
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
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
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
    async handleStoreAdminRole() {
      this.storeLoading = true
      await store(this.form)
      this.storeLoading = false
      await this.getList()
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleStoreAdminRole()
          this.dialogFromVisible = false
          this.form.name = ''
          this.form.description = ''
        } else {
          console.log('提交失败！！')
          return false
        }
      })
    }
  }
}
</script>
