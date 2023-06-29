<script>

import { toDoListsApiMixin } from "@/api/toDoLists";

import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
  mixins: [toDoListsApiMixin],
  data() {
    return {
      loading: false,
      title: "",
      toDoList: [],
      CreateListRules: [
        (title) => {
          if (!title) return "Insira um título para a lista";
        }
      ],
    };
  },
  methods: {
    async saveList() {
      this.loading = true;
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
        this.loading = false;
      }
    },
  },

};
</script>

<template>

  <v-form class="d-flex flex-column align-center" @submit.prevent="saveList">
    <v-text-field class="w-75 ma-2 text-amber-darken-3" variant="outlined"
    v-model = "title" label="Título da Lista" :rules="CreateListRules">
    </v-text-field>
    <v-btn class="text-amber-darken-3" variant="outlined" @click="saveList" :disabled="!title" >
      Criar
    </v-btn>
  </v-form>
</template>