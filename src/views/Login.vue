<script>
import { setupPrivateApi } from "@/api";
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data: () => {
     const emailRegex = /\S+@\S+\.\S+/;
     const specialCharRegex = /[!#$%^&*]/;

    return {
      email: "bianca@mail.com",
      emailRules: [
        (value) => {
          if (!value) return "Insira seu Email";
          if (value.includes(" ")) return "Username nao deve conter espaço";
          if (specialCharRegex.test(value))
            return "Email não pode ter caracter especial";
          if (emailRegex.test(value)) return true;
          return "Insira um email valido";
        },
      ],
      // Username: "",
      // UsernameRules: [
      //   (value) => {
      //     if (!value) return "Insira seu username";
      //     return true;
      //   },
      // ],
      show1: false,
      show2: true,
      password: "1234",
      passwordRules: [
        (value) => {
          if (!value) return "Insira sua senha";
        },
      ],
      isFormValid: true,
    };
  },
  methods: {
    handleClick() {
      this.$router.push("/cadastro");
    },
    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      // console.log(payload);
      // try {
      //   await this.login(payload);
      //   alert("Login realizado com sucesso");
      //   this.$router.push("/");
      // } 
      try {
        const { data } = await this.login(payload);
        const { access_token } = data;
        setupPrivateApi(access_token);
        localStorage.setItem("access_token", access_token);
        this.$router.push("/dashboard");
      } catch (err) {
        alert("Algo deu errado");
      }
      // catch (err) {
      //   const status = err.login.status;
      //   if (status >= 500 && status < 600) {
      //     alert("Ocorreu um erro no servidor! Tente mais tarde");
      //   } else {
      //     alert("Algo deu errado. Pedimos desculpas");
      //   }
      // }
    },
  },
};
</script>

<template>
  <h1 class="text-button text-amber-darken-3 pb-3">Login</h1>
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
        >Cadastrar</v-btn
      >
    </v-form>
  </v-sheet>
  <div class="ml-10 pl-16 img-container">
    <v-img
      class="w-75"
      src="/public/bee2.png"
      position="absolute"
      cover
    ></v-img>
  </div>
</template>

<style>
.img-container {
  position: absolute;
  bottom: 35px;
}

.relative {
  position: relative;
}
</style>