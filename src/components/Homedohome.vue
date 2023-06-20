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

  <v-sheet class="w-75 pt-16 mt-16 text-amber-darken-3">
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
      >Cadastro</v-btn
    >
    <!-- </v-form> -->
  </v-sheet>
</template>
