<script>
import SidebarMenu from "@/components/SidebarMenu.vue";
// import StopWatch from "@/components/StopWatch.vue";

export default {
  name: "App",
  components: {
    SidebarMenu,
  },
};
</script>
<template>
  <main>
    <SidebarMenu />
    <div class="b-example-divider"></div>
    <div
      class="d-flex flex-shrink-0 p-3 text-white bg-dark"
      style="width: 720px"
    >
      <router-view />
    </div>
  </main>
</template>

<!-- <template>
  <router-view />
  <StopWatch />
</template> -->
