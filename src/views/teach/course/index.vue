<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>课程管理</span>
      </div>
      <div>
        <!-- 查询表单 -->
        <el-form :inline="true">
          <el-form-item label="课程名称">
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
          <el-table-column label="课程名称" align="center" width="100px" prop="name" :show-overflow-tooltip="true"/>
          <el-table-column label="授课教师" prop="teacherName" width="100px" align="center" :show-overflow-tooltip="true"/>
          <el-table-column label="助教" width="80px" align="center" prop="assistantName"/>
          <el-table-column label="课时" align="center" width="150px" prop="classHour"/>
          <el-table-column label="学分" align="center" prop="credits"/>
          <el-table-column label="描述" align="center" width="200px" prop="email"/>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"/>
            </template>
          </el-table-column>
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
            @pagination="init"
        />
      </div>

      <el-dialog :title="title" :visible.sync="open">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="课程名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学分" prop="credits">
                <el-input-number v-model="form.credits" :min="1"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授课教师" prop="teacherId">
                <el-select v-model="form.teacherId">
                  <el-option :key="item.id" v-for="item in teacherOptions" :label="item.name" :value="item.id">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="助教" prop="assistantId">
                <el-select v-model="form.assistantId">
                  <el-option :key="item.id" v-for="item in assistantOptions" :label="item.name" :value="item.id">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课时">
                <el-input v-model="form.classHour"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">禁用</el-radio>
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
import {addCourse, deleteCourse, editCourse, getCourseList} from "@/api/teach/course";
import {getStudentList, getTeacherList} from "@/api/system/user";

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
      teacherOptions: {},
      assistantOptions: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.modalName = '课程信息';
      this.getList();
    });
  },
  methods: {
    getList() {
      this.loading = true;
      getCourseList(this.queryParams).then(response => {
        console.log(response);
        this.list = response.rows;
        this.loading = false;
      });
    },
    reset() {
      this.form = {
        name: undefined,
        teacherId: undefined,
        assistantId: undefined,
        classHour: undefined,
        credits: undefined,
        desc: undefined,
        status: '0',
      }
    },
    handleAdd() {
      getTeacherList().then(res => {
        this.teacherOptions = res.rows;
        console.log(res);
      });
      getStudentList().then(res => {
        this.assistantOptions = res.rows;
      });
      this.title = '添加课程信息';
      this.init();
      this.reset();
      this.open = true;
    },
    handleDelete(row) {
      const deleteIds = row.id || this.ids;
      this.$confirm('是否删除编号为' + deleteIds + '的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteCourse(deleteIds);
      }).then(() => {
        this.init();
        this.msgSuccess("删除成功!!!")
      })
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.birth) {
            this.form.birth = parseTime(this.form.birth);
          }
          if (this.form.id !== undefined) {
            editCourse(this.form).then(res => {
              this.msgSuccess(res.msg);
              this.open = false;
            });
          } else {
            addCourse(this.form).then(() => {
              this.msgSuccess(this.form.name + '学生添加成功!');
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
