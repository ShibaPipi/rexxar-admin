<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="活动性质" prop="list">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="form.formList" v-loading="listLoading" @change="handleCheckedChange">
          <el-checkbox
            v-for="p in list"
            :key="p.id"
            :label="p.id"
            name="list"
          >
            {{ p.description }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="storeLoading" type="primary" @click="submitForm('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchPermissionList, storePermission } from '@/api/system/admin-role'

export default {
  name: 'AdminRolePermission',
  data() {
    return {
      id: 0,
      listLoading: false,
      storeLoading: false,
      list: [],
      checkAll: false,
      isIndeterminate: true,
      form: {
        formList: []
      },
      rules: {
        formList: [
          { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchPermissionList(this.id)
      this.list = data.permissions
      this.form.formList = data.rolePermissions
      this.handleCheckedChange(this.form.formList)
      this.listLoading = false
    },
    async handleStore() {
      this.storeLoading = true
      await storePermission(this.id, this.form)
      this.storeLoading = false
    },
    handleCheckAllChange(val) {
      this.form.formList = val ? this.list.map(item => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleStore()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
