<template>
  <article class="survey">
    <h1 class="title">{{ title }}</h1>

    <footer class="footer">
      <p class="author">{{ author }}</p>

      <div class="ends" :class="{ red: daysToEnd <= 1 }">
        Termina {{ endsIn }}
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  name: "Survey",

  props: {
    title: {
      required: true,
      type: String,
    },
    initiatedAt: {
      required: true,
      type: String,
    },
    endedAt: {
      required: true,
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
  },

  computed: {
    daysToEnd() {
      return this.$date.difference2Dates(
        this.endedAt,
        this.$date.currentDateHour()
      );
    },

    endsIn() {
      const message =
        this.daysToEnd === 0
          ? "hoje"
          : this.daysToEnd === 1
          ? `em ${this.daysToEnd} dia`
          : `em ${this.daysToEnd} dias`;

      return message;
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss"/>