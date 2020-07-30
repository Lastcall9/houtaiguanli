<template>
  <el-container style="height:100%;">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <CommonTab></CommonTab>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonTab from "../components/CommonTab";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },
  components: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-header {
  background: black;
}
</style>