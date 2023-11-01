<script setup>
import LayoutFixed from "../components/Layoutfixed.vue";
import LayoutNav from "../components/LeyoutNav.vue";
import LayoutHeader from "../components/LayoutHeader.vue";
import LayoutFooter from "../components/LayoutFooter.vue";
</script>

<template >
  <div class="container">
    <!-- <LayoutFixed></LayoutFixed> -->
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <RouterView />
    <LayoutFooter></LayoutFooter>
  </div>
</template> 

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}
</style>