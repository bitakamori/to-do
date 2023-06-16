<script>
 import { RouterLink, RouterView} from 'vue-router'

  export default {
    data: () => ({
      email: '',
      emailRules: [
        value => {
          if (!value ) return 'Email must be at least 1 character.';
          if (/\S+@\S+\.\S+/.test(value)) return true;
          return 'Email must be valid';
        },
      ],
      show1: false,
      show2: true,
      password: '',
      passwordRules: [
        value => {
          if (!value) return 'Password must be at least 1 character.'
        },
      ],
      isFormValid: true
    }),
    methods: {
    handleSubmit (event) {
        event.preventDefault();
        if (!this.isFormValid)
        return;
    }
  }
  }
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    
    <v-form @submit.prevent v-model="isFormValid"> 
      <v-text-field
        v-model="email"
        type="emai"
        label="Email"
        clearable
        hide-details="auto"
        :rules="emailRules">
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

      <v-btn type="submit" :disabled="!isFormValid" @click="handleSubmit" block class="mt-2">Login</v-btn>
    </v-form>
  </v-sheet>
  <RouterLink id="btn" type="button" to="cadastro">Cadastro</RouterLink>
  <RouterView />
</template>

<style> 
#btn {
  border: 1px solid red;
}
</style>
