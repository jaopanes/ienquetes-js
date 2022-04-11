<template>
  <section class="login" @keypress.enter="submit">
    <p class="description">
      Faça login, crie e responda enquetes em tempo real
    </p>

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

    <p class="text-register">
      Novo por aqui? <router-link to="/registro">Cadastre-se</router-link>
    </p>

    <div class="base-button">
      <button class="btn-submit" @click="submit">Fazer login</button>
    </div>
  </section>
</template>

<script>
export default {
  namr: "AuthLogin",

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