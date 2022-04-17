<template>
  <section id="main">
    <header class="header">
      <div class="user-info">
        <img src="../../assets/images/mock.jpg" class="picture" />
        <p class="name">{{ userLogged.name }}</p>
      </div>

      <span>Menu</span>
    </header>

    <slot />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",

  computed: {
    ...mapGetters("auth", {
      userLogged: "getUserLogged",
    }),
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />