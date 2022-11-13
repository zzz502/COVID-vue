
<template>
  <div class="hamburger-container" @click="toggleClick" id="hamburger">
    <svg-icon :icon="hamburger-opened"></svg-icon>
  </div>
</template>

<script>
import Headers from "@/components/headers/index";

export default {
  name: "hamburger"
}
// <!--import { useStore } from 'vuex'-->
// <!--import { computed } from 'vue'-->
// <!--const store = useStore()-->
// <!--const toggleClick = () => {-->
// <!--  store.commit('app/changeSiderType')-->
// <!--}-->
// <!--const icon = computed(() => {-->
// <!--  return store.getters.siderType ? 'hamburger-opened' : 'hamburger-closed'-->
// <!--})-->
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
