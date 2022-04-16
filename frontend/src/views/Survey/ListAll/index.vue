<template>
  <section class="list-all">
    <base-title size="md">Últimas enquetes</base-title>

    <div class="all-surveys">
      <survey
        v-for="survey in surveys"
        :key="survey.id"
        :title="survey.title"
        :initiatedAt="survey.initiatedAt"
        :endedAt="survey.endedAt"
        :author="survey.user.name"
      />
    </div>
  </section>
</template>

<script>
import Survey from "../../../modules/survey/components/Survey/index.vue";

export default {
  name: "ListAll",

  components: { Survey },

  data() {
    return {
      surveys: [],
    };
  },

  async mounted() {
    const response = await this.$api.survey.listAll();

    if (response.status !== 200) {
      this.$toast.open({
        message: response.data.erros[0],
        type: "error",
        position: "top",
      });

      return;
    }

    this.surveys = response.data;
  }, 

  beforeUnmount() {
    console.log('destruido')
  }
};
</script>

<style scoped lang="scss" src="./styles.scss" />