<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>课题管理</span>
      </div>
      <div>
        <!-- 查询表单 -->
        <el-form :inline="true">
          <el-form-item label="课题名称">
            <el-input v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">搜索</el-button>
            <el-button type="danger">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 功能按钮 -->
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">增加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">修改
            </el-button>
          </el-col>
        </el-row>
        <!-- 数据展示 -->
        <el-table :data="list" v-loading="loading" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"/>
          <el-table-column label="课题名称" align="center" width="140px" prop="name" :show-overflow-tooltip="true"/>
          <el-table-column label="所属课程" prop="courseName" width="100px" align="center" :show-overflow-tooltip="true"/>
          <el-table-column label="简介" width="80px" align="center" prop="assistantName"/>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === '0'" type="info">未开始</el-tag>
              <el-tag v-if="scope.row.status === '1'" type="success">进行中</el-tag>
              <el-tag v-if="scope.row.status === '2'" type="danger">已结束</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" align="center" prop="beginTime"/>
          <el-table-column label="结束时间" align="center" prop="endTime"/>
          <el-table-column label="创建时间" align="center" width="160" prop="createTime">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit"
                         @click="handleUpdate(scope.row)">修改
              </el-button>
              <el-button
                  slot="reference"
                  type="text"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页导航 -->
        <Pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
      </div>

      <el-dialog :title="title" :visible.sync="open">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="课题名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属课程" prop="courseId">
                <el-select v-model="form.courseId">
                  <el-option :key="item.id" v-for="item in courseOptions" :label="item.name" :value="item.id">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker v-model="form.beginTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-date-picker v-model="form.endTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                  <el-radio label="0">未开始</el-radio>
                  <el-radio label="1">进行中</el-radio>
                  <el-radio label="2">已结束</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <el-button @click="handleCancel">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import Pagination from '@/components/Pagination/index';
import {parseTime} from "@/utils/commonUtils";
import {addCurriculum, deleteCurriculum, editCurriculum, getCurriculumList} from "@/api/teach/curriculum";
import {getCourseList} from "@/api/teach/course";

export default {
  name: "course",
  components: {
    Pagination
  },
  mixins: [initData],
  data() {
    return {
      rules: {
        no: [
          {required: true, message: '请输入学号!', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名!', trigger: 'blur'}
        ],
        classId: [
          {required: true, message: '请选择班级!', trigger: 'blur'}
        ],
        cardId: [
          {required: true, message: '请输入身份证号码!', trigger: 'blur'}
        ]
      },
      info: {},
      courseOptions: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.modalName = '课题信息';
      this.getList();
    });
  },
  methods: {
    getList() {
      this.loading = true;
      getCurriculumList(this.queryParams).then(response => {
        this.total = response.total;
        this.list = response.rows;
        this.loading = false;
      });
    },
    reset() {
      this.form = {
        name: undefined,
        courseId: undefined,
        beginTime: undefined,
        endTime: undefined,
        desc: undefined,
        status: '0',
        remark: ''
      }
    },
    getCourseOptions() {
      getCourseList().then(res => {
        this.courseOptions = res.rows;
      });
    },
    handleAdd() {
      this.getCourseOptions();
      this.title = '添加课题信息';
      this.getList();
      this.reset();
      this.open = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.getCourseOptions();
      this.form = row;
      this.open = true;
      this.title = "修改课题信息";
    },
    handleDelete(row) {
      const deleteIds = row.id || this.ids;
      this.$confirm('是否删除编号为' + deleteIds + '的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteCurriculum(deleteIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功!!!")
      })
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.beginTime) {
            this.form.beginTime = parseTime(this.form.beginTime);
          }
          if (this.form.endTime) {
            this.form.endTime = parseTime(this.form.endTime);
          }
          if (this.form.id !== undefined) {
            editCurriculum(this.form).then(res => {
              this.msgSuccess(res.msg);
              this.getList();
              this.open = false;
            });
          } else {
            addCurriculum(this.form).then(() => {
              this.msgSuccess(this.form.name + '课题添加成功!');
              this.getList();
              this.open = false;
            });
          }
        }
      });
    },
    handleQuery() {
      this.getList();
    },
    handleCancel() {
      this.open = false;
    }
  }
}
</script>

<style scoped>

</style>
