<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { Button} from 'element-ui';
export default {
  components:{
    Button
  }
}
</script>
<style lang="scss">
#app{
  height: 100vh;
}
</style>