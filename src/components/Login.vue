<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data: () => ({
    email: "",
    emailRules: [
      (value) => {
        if (!value) return "Email must be at least 1 character.";
        if (/\S+@\S+\.\S+/.test(value)) return true;
        return "Email must be valid";
      },
    ],
    show1: false,
    show2: true,
    password: "",
    passwordRules: [
      (value) => {
        if (!value) return "Password must be at least 1 character.";
      },
    ],
    isFormValid: true,
  }),
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      if (!this.isFormValid) return;
    },
    handleClick(event) {
      event.preventDefault();
      if (!this.isFormValid) return;
    },
  },
};
</script>

<template>
  <main class="bg-red w-100 h-100 bg-amber-lighten-3 d-flex align-center">
    <v-container class="h-75 w-75 rounded-xl bg-white d-flex align-center">
      <v-row class="d-flex align-center">
        <v-col class="w-50 bg-red">
          <v-img class="rounded-xl" src="bg1.png" cover></v-img>
        </v-col>

        <v-col class="w-50 h-100 d-flex justify-center">
          <v-sheet  class="w-75 text-amber-darken-4 bg-transparent">
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
                label="Password"
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

            <RouterView />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style>
#btn {
  border: 1px solid red;
}

:root {
  overflow: hidden;
}
</style>
