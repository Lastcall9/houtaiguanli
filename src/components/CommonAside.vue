<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="ffd04b"
      :collapse="isCollage"
    >
      <h3 v-show="!isCollage">后台管理系统</h3>
      <h3 v-show="isCollage">Zeus</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren"
        :key="item.id"
        @click="clickMenu(item)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu index="index" v-for="item in hasChildren" :key="item.id">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <i :class="'el-icon-' + subItem.icon"></i>
            <span slot="title">{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      asideMenu: [
        {
          id: 1,
          name: "home",
          path: "/",
          label: "首页",
          icon: "s-home",
        },
        {
          id: 2,
          name: "video",
          path: "/video",
          label: "视频管理",
          icon: "video-play",
        },
        {
          id: 3,
          name: "user",
          path: "/user",
          label: "用户管理",
          icon: "user",
        },
        {
          id: 4,
          name: "other",
          label: "其他",
          icon: "user",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
            },
          ],
        },
      ],
    };
  },
 computed: {
    //   计算是否有children
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollage(){
      return this.$store.state.tab.isCollapse
    },
    menu(){
      return this.$store.state.tab.menu
    }
  },
  methods: {
    clickMenu(item) {
      // 完成路由跳转
      this.$router.push({name:item.name})
      this.$store.commit("selectMenu", item);
      
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
