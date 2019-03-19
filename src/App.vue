<template>
  <div id="app">
    <!-- <top></top> -->
    <router-view/>
    <foot></foot>
  </div>
</template>

<script>
// import top from '@/components/top'
import foot from '@/components/foot'
export default {
  name: 'App',
  components: {
    foot
  }
}
</script>

<style scoped lang="scss">
#app {
}
</style>
