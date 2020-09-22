<template>
  <div class="app-container">
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
      />
      <el-table-column
        prop="email"
        label="邮箱"
      />
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="180"
      />
      <el-table-column
        prop="last_login_at"
        label="上次登录时间"
        width="120"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      />
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/member'

export default {
  name: 'Index',
  data() {
    return {
      listLoading: true,
      listQuery: {},
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const res = await fetchList(this.listQuery)
      this.list = res.data
      this.listLoading = false
    }
  }
}
</script>

<style scoped></style>
