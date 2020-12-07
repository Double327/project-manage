<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>学生管理</span>
      </div>
      <div>
        <!-- 查询表单 -->
        <el-form :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="queryParams.no"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="queryParams.cardId"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="queryParams.phone"></el-input>
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
          <el-table-column label="姓名" align="center" width="100px" prop="name" :show-overflow-tooltip="true"/>
          <el-table-column label="学号" prop="no" width="100px" align="center" :show-overflow-tooltip="true"/>
          <el-table-column label="班级" width="80px" align="center" prop="className"/>
          <el-table-column label="手机号" align="center" width="150px" prop="phone"/>
          <el-table-column label="邮箱" align="center" width="200px" prop="email"/>
          <el-table-column label="出生日期" align="center" width="200px" prop="birth">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.birth) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center" prop="sex"/>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="1" inactive-value="0"/>
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
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学号" prop="no">
                <el-input v-model="form.no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级" prop="classId">
                <el-select v-model="form.classId">
                  <el-option :key="item.id" v-for="item in classOptions" :label="item.name" :value="item.id">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="身份证号码">
                <el-input v-model="form.cardId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <el-date-picker v-model="form.birth"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
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
            <el-col :span="12">
              <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <el-button>取消</el-button>
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
import {getClassList} from "@/api/teach/class";
import {addUser, deleteUser, editUser, getStudentList} from "@/api/system/user";
import {parseTime} from "@/utils/commonUtils";

export default {
  name: "student",
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
      classOptions: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.modalName = '学生信息';
      this.getList();
    });
  },
  methods: {
    beforeInit() {
      this.base = '/system/user';
      this.modalName = '学生';
      return true;
    },
    getList() {
      this.loading = true;
      getStudentList(this.queryParams).then(response => {
        console.log(response);
        this.list = response.rows;
        this.loading = false;
      });
    },
    reset() {
      this.form = {
        name: undefined,
        no: undefined,
        classId: undefined,
        cardId: undefined,
        phone: undefined,
        email: undefined,
        birth: undefined,
        sex: '1',
        status: '0',
        password: '123456',
        roleIds: ['4']
      }
    },
    handleAdd() {
      getClassList().then(res => {
        this.classOptions = res.rows;
      });
      this.title = '添加学生信息';
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
        return deleteUser(deleteIds);
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
            editUser(this.form).then(res => {
              this.msgSuccess(res.msg);
              this.open = false;
            });
          } else {
            addUser(this.form).then(() => {
              this.msgSuccess(this.form.name + '学生添加成功!');
              this.open = false;
            });
          }
        }
      });
    },
    handleQuery() {
      this.getList();
    }
  }
}
</script>

<style scoped>

</style>
