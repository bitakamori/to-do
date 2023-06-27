<script>

import { toDoListsApiMixin } from "@/api/toDoLists";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      title: "",
      toDoList: [],
    };
  },
  methods: {
    async saveList() {
      try {
        const title = {
        title: this.title
      }
        const { data } = await this.create(title);
        // this.toDoList.push(data);
        this.$router.push("/dashboard")
      } catch (err) {
        console.log(err);
      } finally {
        this.title = "";
      }
    },
  },

};
</script>

<template>

  <v-form @submit.prevent="saveList">
    <v-text-field
    v-model = "title">
    </v-text-field>
    <v-btn @click="saveList">
      Criar
    </v-btn>
  </v-form>
</template>