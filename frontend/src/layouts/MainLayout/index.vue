<template>
  <section id="main">
    <header class="header">
      <div class="user-info">
        <img src="../../assets/images/mock.jpg" class="picture" />
        <p class="name">João Neto</p>
      </div>

      <span>Menu</span>
    </header>

    <slot />
  </section>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style scoped lang="scss" src="./styles.scss" />