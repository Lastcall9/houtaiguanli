<template>
  <div class="manage">
    <!-- dialog -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
      ></CommonForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格相关 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <CommonForm inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary">搜索</el-button>
      </CommonForm>
    </div>
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="deleteUser"
    ></CommonTable>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";
export default {
  name: "",
  props: [""],
  data() {
    return {
      isShow: false,
      searchFrom: {
        keyword: "",
      },
      //   dialog form
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: 1,
      },
      // dialog  formlabel
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
        },
        {
          model: "age",
          label: "年龄",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
        },
      ],
      formLabel: [
        {
          model: "keyword",
          label: "",
          options: [],
        },
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 250,
        },
        {
          prop: "addr",
          label: "地址",
          width: 600,
        },
      ],
      config: {
        page: 1,
        total: 20,
        loading: false,
      },
      operateType: "add",
    };
  },
  components: {
    CommonForm,
    CommonTable,
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    //   获取表格数据
    getList() {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
          },
        })
        .then((res) => {
          // 处理性别问题
          this.tableData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    // 编辑用户
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      //   将表单中的赋值  展现出来
      this.operateForm = row;
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id,
              },
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getList()
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击dialog确认后
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then((res) => {
          console.log(res);
        });
      }
    },
    // 新增用户
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/common.scss";
</style>