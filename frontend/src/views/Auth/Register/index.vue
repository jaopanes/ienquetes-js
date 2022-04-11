<template>
  <section class="register" @keypress.enter="submit">
    <the-title>
      Crie sua conta e interaja criando e respondendo enquetes
    </the-title>

    <base-input
      id="name"
      placeholder="João Silva"
      label="Nome"
      type="text"
      :required="true"
      v-model="form.name"
    />

    <base-input
      id="usuario"
      placeholder="joaosilva"
      label="Usuário"
      type="text"
      :required="true"
      v-model="form.nickname"
    />

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

    <base-input
      id="confirmPassword"
      placeholder="*******"
      label="Confirmação de senha"
      type="password"
      :required="true"
      v-model="form.confirmPassword"
    />

    <p>
      Já possui conta?
      <strong><router-link to="/">Logar-se</router-link></strong>
    </p>

    <div class="base-button">
      <base-button @click="submit">Cadastrar</base-button>
    </div>
  </section>
</template>

<script>
import TheTitle from "../../../modules/auth/components/TheTitle/index.vue";
import BaseButton from "../../../modules/auth/components/BaseButton/index.vue";

export default {
  namr: "AuthLogin",

  components: { TheTitle, BaseButton },

  data() {
    return {
      form: {
        name: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
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
      const { name, nickname, email, password, confirmPassword } = this.form;

      if (!name) {
        this.toast("Nome é obrigatório!", "error");
        return false;
      }
      if (!nickname) {
        this.toast("Usuário é obrigatório!", "error");
        return false;
      }
      if (!email) {
        this.toast("Email é obrigatório!", "error");
        return false;
      }
      if (!password) {
        this.toast("Senha é obrigatória!", "error");
        return false;
      }
      if (!confirmPassword) {
        this.toast("Confirmação de senha é obrigatória!", "error");
        return false;
      }

      return true;
    },

    async submit() {
      if (!this.validateForm()) return;

      const response = await this.$api.user.register(this.form);

      if (![201, 200].includes(response.status)) {
        this.toast(response.data.erros[0], "error");
        return;
      }

      this.toast("Usuário registrado com sucesso!", "success");

      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />