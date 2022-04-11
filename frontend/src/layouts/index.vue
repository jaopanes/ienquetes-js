<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import AppDefault from "./AppDefault/index.vue";
import { ref, markRaw } from "vue";
export default {
  name: "AppLayout",
  data() {
    return {
      layout: ref(),
    };
  },
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component =
            route.meta.layout &&
            (await import(`./${route.meta.layout}/index.vue`));
          this.layout = markRaw(component?.default || AppDefault);
        } catch (e) {
          this.layout = markRaw(AppDefault);
        }
      },
    },
  },
};
</script>