<script>
export default {
  methods: {
    handleLogin() {
      this.$router.push("/login");
    },
    handleCadastro() {
      this.$router.push("/cadastro");
    },
  },
};
</script>

<template>
  <dir>
    <v-img
              class="rounded-xl rounded-be-0 d-md-none w-100 mb-5"
              src="/public/bg3.png"
              cover
            ></v-img>
  </dir>
  <v-sheet class="w-75 pt-md-16 mt-md-16 text-amber-darken-3">
    <!-- <v-form @submit.prevent v-model="isFormValid"> -->
    <v-btn
      type="submit"
      variant="outlined"
      @click="handleLogin"
      block
      class="mt-2 bg-transparent"
      >Login</v-btn
    >
    <v-btn
      type="button"
      variant="outlined"
      @click="handleCadastro"
      block
      class="mt-2 bg-transparent"
      >Cadastrar</v-btn
    >
    <!-- </v-form> -->
  </v-sheet>
</template>