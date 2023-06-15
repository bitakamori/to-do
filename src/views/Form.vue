<script>
export default {
  data: () => ({
    firstName: "",
    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a first name.";
      },
    ],
  }),
  methods: {
    handleSubmit (event) {
        event.preventDefault();
        if (!this.isFormValid)
        alert("Preencha direito, por favor!")
        return;
    }
  }
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <!-- input  -->
      <v-text-field
        v-model="firstName"
        :rules="rules"
        label="First name"
      ></v-text-field>
      <v-btn type="submit" :disabled="!isFormValid" @click="handleSubmit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>
