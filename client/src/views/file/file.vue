<template>
<div class="container">
  <div class="search_wrap">
    <el-form :inline="true" :model="queryForm" label-width="60px" label-position="left" size="small">
      <el-form-item label="文件名">
        <el-input v-model="queryForm.name" placeholder="文件名" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="queryForm.type" placeholder="类型" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table_wrap">
    <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="小图" align="center">
        <template slot-scope="scope">
          <img class="thumbnail" :src="scope.row.url" :alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="url" label="路径" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" rel="noopener noreferrer">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="上传时间" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
      <el-table-column prop="size" label="大小" align="center"></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page_wrapping">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
  </div>
</div>
</template>

<script>
import Message from '@/document/message'
import Dialog from '@/document/dialog'
export default {
  data() {
    return {
      dataList: [], // 数据列表
      ids: [], // 已选项 id 数组
      queryForm: {}, // 查询参数
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSelectionChange(val) { // 复选框
      let ids = []
      val.forEach(item => {
        ids.push(item.id)
      })
      this.ids = ids
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(id) { // 删除
      Dialog({
        type: 'confirm',
        title: '提示',
        message: '您正在进行[删除]操作，此操作不可撤回！',
        success: () => {
          this.$store.dispatch('deleteFile', {
            id
          }).then((res) => {
            this.getData()
            Message({
              type: 'success',
              message: res.msg
            })
            console.log(res)
          })
        },
        cancel: () => {
          console.log('TH_Dialog: operation cancelled...')
        }
      })

    },
    handleSizeChange(val) { // 分页
      this.page.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getData()
    },
    getData() { // 获取文件（图片）列表
      this.$store.dispatch('getFiles', {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        ...this.queryForm
      }).then((res) => {
        console.log(res)
        this.page.currentPage = res.data.currentPage
        this.page.pageSize = res.data.pageSize
        this.page.total = res.data.total
        this.dataList = res.data.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.page_wrapping {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
