<script>
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data: () => {
    const lowerCaseRegex= /^[a-z]+$/;
    const emailRegex= /\S+@\S+\.\S+/;
    const specialCharRegex= /[!@#$%^&*]/;
    const specialCharRegexEmail= /[!#$%^&*]/;
    const numberRegex= /[0-9]/;
    
    return {
      Username: "",
      UsernameRules: [
        (value) => {
          if (!value) return "Insira seu Username";
          if (value.includes(" ")) return "Username nao deve conter espaço";
          if (lowerCaseRegex.test(value)) return true;
          return "Username nao deve conter letra maiuscula";
        },
      ],
      email: "",
      emailRules: [
        (value) => {
          if (!value) return "Insira seu Email";
          if (value.includes(" ")) return "Email nao deve conter espaço";
          if (specialCharRegexEmail.test(value))
            return "Email não pode ter caracter especial";
          if (emailRegex.test(value)) return true;
          return "Insira um email valido";
        },
      ],
      show1: false,
      show2: true,
      password: "",
      passwordRules: [
        (value) => {
          if (value.length < 8)
            return "Senha deve conter pelo menos 8 caracteres";
          console.log(value.length);
          if (!specialCharRegex.test(value))
            return "Senha precisa ter no mínimo um caracter especial";
          if (!numberRegex.test(value))
            return "Senha precisa ter no mínimo um numero";
          return true;
        },
      ],
      show1: false,
      show2: true,
      confirmpassword: "",
      confirmpasswordRules: [
        (value) => {
          passwordconf;
        },
      ],
      isFormValid: true,
    };
  },
  methods: {
    handleClick() {
       this.$router.push("/login");
     },
    passwordconf(value) {
      if (value !== this.password) return "Senha incorreta";
      return true;
    },
    async handleSubmit () {
      const payload = {
        username: this.Username,
        email: this.email,
        password: this.password,
      };

      try {
        await this.register(payload);
        alert("Usuário criado com sucesso");
        this.$router.push("/login");
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor! Tente mais tarde")
        } else {
          alert("Algo deu errado. Pedimos desculpas")
        }
      }
    }
  },
};
</script>

<template>
  <h1 class="text-button text-amber-darken-3 pb-3">Cadastro</h1>
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
                label="Senha"
                @click:append="show1 = !show1"
                clearable
                hide-details="auto"
                :rules="passwordRules"
              ></v-text-field>

              <v-text-field
                v-model="confirmpassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Confirmar Senha"
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
                >Cadastrar</v-btn
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
          <div class="pl-16 ml-16 img-container">
            <v-img
              class="w-50"
              src="/public/bee.png"
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
