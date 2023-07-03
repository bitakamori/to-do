<script>
import { setupPrivateApi } from "@/api";
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data: () => {
     const emailRegex = /\S+@\S+\.\S+/;
     const specialCharRegex = /[!#$%^&*]/;

    return {
      loading: false,
      email: "bianca@mail.com",
      emailRules: [
        (value) => {
          if (!value) return "Insira seu Email";
          if (value.includes(" ")) return "Email nao deve conter espaço";
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
      this.loading = true;
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
      } finally {
        this.loading = false;
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
  computed: {
    col1(){
      return {
        "w-100": this.$vuetify.display.smAndDown,
      }
    },
  }
};
</script>

<template>
  <v-img
              class="rounded-xl rounded-be-0 d-md-none"
              src="/public/bgxl.png"
            ></v-img>
  <h1 class="text-button text-amber-darken-3 pb-3">Login</h1>
  <v-sheet class="w-75 text-amber-darken-3" :class="col1">
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
        :append-inner-icon= "show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Senha"
        @click:append-inner="show1 = !show1"
        clearable
        hide-details="auto"
        :rules="passwordRules"
      ></v-text-field>

      <v-btn
        type="submit"
        variant="outlined"
        :loading="loading"
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
  <div class="ml-md-10 pl-md-16 pl-14 img-container">
    <v-img
      class="w-75"
      src="/public/bee3.png"
      cover
    ></v-img>
  </div>
</template>

<style>
.img-container {
  position: absolute;
  bottom: 35px;
}

@media (max-width: 960px) {
  .img-container {
  width: 85%;
}
}
@media (min-width: 960px) {
  .relative {
    position: relative;
}
}
</style>