<template>
  <section class="login" @keypress.enter="submit">
    <base-title>Faça login, crie e responda enquetes em tempo real</base-title>

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
import { mapActions } from "vuex";
import BaseButton from "../../../modules/auth/components/BaseButton/index.vue";

export default {
  name: "AuthLogin",

  components: { BaseButton },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions("auth", {
      authenticate: "authenticate",
    }),

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
      const response = await this.authenticate({ email, password });

      if (!response.ok) {
        this.toast(response.erro, "error");
        return;
      }

      this.toast("Usuário logado com sucesso!", "success");

      setTimeout(() => {
        this.$router.push({ path: "/enquetes" });
      }, 2000);
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />