<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span >{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="text-align: center;">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      background
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    tableLabel: Array,
    tableData: Array,
    config: Object,
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    handleEdit(row) {
        this.$emit('edit',row)
    },
    handleDelete(row) {
        this.$emit('delete',row)
    },
    //   分页触发
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 64px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 20px;
    right: 20px;
    
  }
}
</style>