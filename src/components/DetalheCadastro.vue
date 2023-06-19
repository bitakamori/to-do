<script>
export default {
  data: () => ({
    Username: "",
    // lowerCaseRegex:/^[a-z]+$/,
    UsernameRules: [
      (value) => {
        if(!value) return "Insira seu Username"
        if (value.includes(" ")) return "Username nao deve conter espaço";
        if ((/^[a-z]+$/).test(value)) return true;
        return "Username nao deve conter letra maiuscula"; 
      },
    ],
    email: "",
    // emailRegex: /\S+@\S+\.\S+/,
    emailRules: [
      (value) => {
        if (!value) return "Email must be at least 1 character.";
        if ((/\S+@\S+\.\S+/).test(value)) return true;
        return "Email must be valid";
      },
    ],
    show1: false,
      show2: true,
      password: '',
      // specialCharRegex: /[!@#$%^&*]/,
      // numberRegex: /[0-9]/,
      passwordRules: [
        value => {
          if (value.length < 8) return 'Password must be at least 8 character.';
          console.log(value.length)
          if (!(/[!@#$%^&*]/).test(value)) return 'Password precisa ter no minimo um caracter especial';
          if (!(/[0-9]/).test(value)) return 'Password precisa ter no minimo um numero';
          return true;
        },
      ],
      show1: false,
      show2: true,
      confirmpassword: '',
      confirmpasswordRules: [
        value => {
            passwordconf
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
      this.$router.push('/');
    },
    passwordconf(value) {
      if (value !== this.password) return "Password incorreta";
      return true;
    },
  },
};
</script>

<template>
  <main class="w-100 h-100  d-flex align-center">
    <v-container class="h-75 w-75 rounded-xl bg-white d-flex align-center">
      <v-row class="h-100 w-100 d-flex align-center">
        <v-col class="w-50 h-100 bg-white d-flex align-center">
          <v-img class="rounded-xl rounded-be-0" src="/public/bg3.png" cover></v-img>
        </v-col>

        <v-col
          class="w-50 h-100 d-flex justify-center align-center flex-column relative"
        >
          <v-sheet class="w-75 text-amber-darken-3">
            <v-form @submit.prevent v-model="isFormValid">
              <v-text-field
                v-model="Username"
                label="Username"
                clearable
                hide-details="auto"
                :rules="UsernameRules"
              >
              </v-text-field>

              <v-text-field
                v-model="email"
                type="emai"
                label="Email"
                clearable
                hide-details="auto"
                :rules="emailRules"
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

              <v-text-field
                v-model="confirmpassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Confirm Password"
                @click:append="show1 = !show1"
                clearable
                hide-details="auto"
                :rules="[passwordconf]"
              ></v-text-field>

              <v-btn
                type="submit"
                variant="outlined"
                :disabled="!isFormValid"
                @click="handleSubmit"
                block
                class="mt-2 bg-transparent"
                >Cadastro</v-btn
              >
              <v-btn 
                type="button"
                variant="outlined"
                @click="handleClick"
                block
                class="mt-2 bg-transparent"
                >Login</v-btn
              >
            </v-form>
          </v-sheet>
          <div class="ml-16 pl-16 img-container">
            <v-img class="w-50" src="/public/bee.png" position="absolute" cover></v-img>
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