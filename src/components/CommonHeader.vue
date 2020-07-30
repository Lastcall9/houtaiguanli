<template>
    <header>
            <div class="l-content">
                <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="current.path" v-if="current">
                            {{ current.label }}
                        </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="r-content">
                <el-dropdown trigger="click" size="mini">
                    <span class="el-dropdown-link">
                        <img :src="userImg" class="userImg"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
    </header>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "",
        props: [""],
        data() {
             return {
                 userImg: require("../assets/image/1997.jpg"), }
            },
        components: {},
        computed: {
            ...mapState({
             current: (state) => state.tab.currentMenu,
        })
  },
        methods: {
            
        collapseMenu() {
            this.$store.commit('collapseMenu')
        },
        logOut() {
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            location.reload()
        }
        },
        }
</script>

<style lang="scss" scoped>
header {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}
.l-content {
    display: flex;
    align-items: center;
        .el-button {
            margin-right: 10px;
  }
}
.r-content {
    .userImg {
        width: 50px;
        height: 50px;

    }
}


</style>

<style lang="scss">
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: white
}

.el-breadcrumb__inner.is-link {
    color: white
}
</style>