<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import Default from "./Default/index.vue";
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
          this.layout = markRaw(component?.default || Default);
        } catch (e) {
          this.layout = markRaw(Default);
        }
      },
    },
  },
};
</script>