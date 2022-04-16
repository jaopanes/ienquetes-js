<template>
  <p class="title" :class="titleClasses">
    <template v-if="text">
      {{ text }}
    </template>

    <template v-else>
      <slot />
    </template>
  </p>
</template>

<script>
export default {
  name: "BaseTitle",

  props: {
    text: {
      required: false,
      type: String,
    },
    size: {
      required: false,
      type: String,
      default: "",
    },
  },

  computed: {
    titleClasses() {
      return [this.size];
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />