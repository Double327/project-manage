<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>角色管理</span>
      </div>
      <div>
        <!-- 查询表单 -->
        <el-form :inline="true">
          <el-form-item label="角色名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="权限字符串">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker size="small" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" v-model="dateRange"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button type="danger">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 功能按钮 -->
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini">增加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" icon="el-icon-edit" size="mini">修改</el-button>
          </el-col>
        </el-row>
        <!-- 数据展示 -->
        <el-table :data="list" v-loading="loading">
          <el-table-column type="selection" align="center"/>
          <el-table-column label="角色名称" align="center" prop="name" :show-overflow-tooltip="true"/>
          <el-table-column label="权限字符" prop="key" align="center" :show-overflow-tooltip="true"/>
          <el-table-column label="显示顺序" align="center" prop="sortNum"/>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"/>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit"
                         @click="handleUpdate(scope.row)">修改
              </el-button>
              <el-popover :ref="scope.row.id" placement="top" width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消
                  </el-button>
                  <el-button :loading="loading" type="primary" size="mini">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="text" icon="el-icon-delete" size="mini">删除
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页导航 -->
        <el-pagination

            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="10"
            :total="total"
        />
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
        <!-- 新增、修改对话框 -->
      </div>
    </el-card>
  </div>
</template>

<script>
import initData from "@/mixins/initData";

export default {
  name: "Role",
  mixins: [initData],
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      this.init()
    });
  },
  methods: {
    beforeInit() {
      this.base = '/system/role';
      this.modelName = '角色';
      return true
    },
  }
}
</script>

<style scoped>

</style>
