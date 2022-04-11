<template>
  <p class="title">
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
  name: "AuthTheTitle",

  props: {
    text: {
      required: false,
      type: String,
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />