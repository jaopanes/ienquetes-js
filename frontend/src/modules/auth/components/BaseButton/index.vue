<template>
  <button class="button">
    <template v-if="content">{{ content }}</template>
    <template v-else><slot /></template>
  </button>
</template>

<script>
export default {
  name: "AuthBaseButton",

  props: {
    content: {
      required: false,
      type: String,
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />