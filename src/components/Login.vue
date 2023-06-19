<script>
export default {
  data: () => ({
    email: "",
    emailRules: [
      (value) => {
        if (!value) return "Insira seu Email";
        if (/\S+@\S+\.\S+/.test(value)) return true;
        return "Insira um email valido";
      },
    ],
    show1: false,
    show2: true,
    password: "",
    passwordRules: [
      (value) => {
        if (!value) return "Insira sua senha";
      },
    ],
    isFormValid: true,
  }),
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      if (!this.isFormValid) return;
    },
    handleClick() {
      this.$router.push('/cadastro');
    },
  },
};
</script>

<template>
  <main class="w-100 h-100  d-flex align-center">
    <v-container class="h-75 w-75 rounded-xl bg-white d-flex align-center">
      <v-row class="h-100 w-100 d-flex align-center">
        <v-col class="w-50 h-100 bg-white d-flex align-center">
          <v-img class="rounded-xl" src="/public/bg3.png" cover></v-img>
        </v-col>

        <v-col
          class="w-50 h-100 d-flex justify-center align-center flex-column relative"
        >
          <v-sheet class="w-75 text-amber-darken-3">
            <v-form @submit.prevent v-model="isFormValid">
              <v-text-field
                v-model="email"
                type="emai"
                label="Email"
                clearable
                hide-details="auto"
                :rules="emailRules"
                class="bg-transparent"
              >
              </v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Senha"
                @click:append="show1 = !show1"
                clearable
                hide-details="auto"
                :rules="passwordRules"
              ></v-text-field>

              <v-btn
                type="submit"
                variant="outlined"
                :disabled="!isFormValid"
                @click="handleSubmit"
                block
                class="mt-2 bg-transparent"
                >Login</v-btn
              >
              <v-btn
                type="button"
                variant="outlined"
                @click="handleClick"
                block
                class="mt-2 bg-transparent"
                >Cadastro</v-btn
              >
            </v-form>
          </v-sheet>
          <div class="ml-10 pl-16 img-container">
            <v-img class="w-75" src="/public/bee2.png" position="absolute" cover></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style>
:root {
  overflow: hidden;
}

.img-container {
  position: absolute;
  bottom: 35px;
}

.relative {
  position: relative;
}
</style>
