<template>
  <div class="tags">
    <el-tag
      :key="index"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
      :effect="$route.name===tag.name?'dark':'light'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  components: {},
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    //   关闭
    handleClose(tag) {
      this.close(tag);
    },
    // vuex
    ...mapMutations({
      close: "closeTab",
    }),
    // 点击后跳转
    changeMenu(item){
      this.$router.push({name:item.name})
      this.$store.commit('selectMenu',item)
    }
  },
};
</script>

<style scoped lang="scss">
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>