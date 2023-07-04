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
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      } finally {
        this.title = "";
        this.loading = false;
      }
    },
  },

};
</script>

<template>

  <v-form class="d-flex flex-column align-center"  @submit.prevent="saveList">
    <v-text-field class="w-75 ma-2 text-amber-darken-3" variant="outlined"
    v-model = "title" label="Título da Lista" clearable :rules="CreateListRules">
    </v-text-field>
  </v-form>
  <div class="d-flex flex-md-row flex-column justify-center align-center mb-md-2">
    <v-btn class="text-amber-darken-3 mr-md-5 mb-3 mb-md-0" variant="outlined" @click="saveList" :disabled="!title" >
      Criar lista
    </v-btn>
      <v-btn class="text-amber-darken-3" variant="outlined" >
        <router-link
          class="text-decoration-none text-amber-darken-3"
          to="/dashboard"
          >voltar para listas
        </router-link>
    </v-btn>
    </div>
</template>

<div class="d-flex flex-md-row flex-column justify-center align-center mb-md-2"></div>