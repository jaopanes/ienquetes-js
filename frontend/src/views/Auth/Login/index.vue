<template>
  <section class="login" @keypress.enter="submit">
    <the-title>Faça login, crie e responda enquetes em tempo real</the-title>

    <base-input
      id="email"
      placeholder="user@email.com"
      label="Email"
      type="email"
      :required="true"
      v-model="form.email"
    />

    <base-input
      id="password"
      placeholder="*******"
      label="Senha"
      type="password"
      :required="true"
      v-model="form.password"
    />

    <p>
      Novo por aqui?
      <strong><router-link to="/registro">Cadastre-se</router-link></strong>
    </p>

    <div class="base-button">
      <base-button @click="submit">Fazer login</base-button>
    </div>
  </section>
</template>

<script>
import TheTitle from "../../../modules/auth/components/TheTitle/index.vue";
import BaseButton from "../../../modules/auth/components/BaseButton/index.vue";

export default {
  name: "AuthLogin",

  components: { TheTitle, BaseButton },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    toast(message, type) {
      this.$toast.open({
        message,
        type,
        position: "top",
      });
    },

    validateForm() {
      const { email, password } = this.form;

      if (!email) {
        this.toast("Email é obrigatório!", "error");
        return false;
      }
      if (!password) {
        this.toast("Senha é obrigatória!", "error");
        return false;
      }

      return true;
    },

    async submit() {
      if (!this.validateForm()) return;

      const { email, password } = this.form;
      const response = await this.$api.user.authenticate(email, password);

      if (![201, 200].includes(response.status)) {
        this.toast(response.data.erros[0], "error");
        return;
      }

      this.toast("Usuário logado com sucesso!", "success");
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />