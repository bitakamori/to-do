<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { itemsApiMixin } from "@/api/itens";

import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
      items: [],
      title: "",
      listTitle: "",
      listId: this.$route.params.id,
      newItem: null,
      loading: false,
      EditTitleRules: [
        (title) => {
          if (!title) return "Insira um título para a lista";
        }
      ],
    };
  },
  methods: {
    async showList() {
      this.loading = true;
      try {
        const { data } = await this.view(this.listId);
        this.items = data.items;
        this.listTitle = data.title;
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      }finally {
        this.loading = false;
      }
    },
    async createTask() {
      this.loading = true;
      try {
        const item = {
          title: this.title,
          listId: this.listId,
        };
        const { data } = await this.createItem(item);

        this.items.push(data);
        this.showList();
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      } finally {
        this.title = "";
        this.loading = false;
      }
    },
    async deleteTask(itemId) {
      this.loading = true;
      try {
        await this.removeItem(itemId);
        this.showList();
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      } finally {
        this.loading = false;
      }
    },
    async updateTitle() {
      this.loading = true;
      const payload = {
        title: this.listTitle,
      };
      try {
        await this.updateList(this.listId, payload);
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      } finally {
        this.loading = false;
      }
    },
    async updTask(id, title) {
      this.loading = true;
      try {
        await this.updateItem(id, { title });
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.showList();
  },
};
</script>
<template>
    <Loading v-if="loading"></Loading>
  <v-container class="w-75 text-amber-darken-3">
    <v-text-field
      v-model="listTitle"
      @keydown.enter="updateTitle"
      variant="outlined"
      label="Título"
      clearable
      :rules="EditTitleRules"
    ></v-text-field>

    <v-container class="w-75 d-md-flex flex-md-column align-md-center">
      <v-text-field
        v-model="title"
        label="Criar task"
        variant="outlined"
        @keydown.enter="createTask"
        clearable
        class="w-100"
      >
        <template v-slot:append-inner>
          <v-btn icon="mdi-plus-circle" variant="text" @click="createTask">
          </v-btn>
        </template>
      </v-text-field>
      <v-card class="w-100" variant="text" v-if="items.length > 0">
        <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
          <v-text-field
            @keydown.enter="updTask(item.id, item.title)"
            :loading="loading == item.id"
            variant="underlined"
            v-model="item.title"
            label="Task"
            class="pl-5 pr-5"
            append-inner-icon="mdi-check"
            append-icon="mdi-trash-can-outline"
            prepend-icon="mdi-bee"
            single-line
            hide-details
            @click:append-inner="updTask(item.id, item.title)"
            @click:append="deleteTask(item.id)"
          >
          </v-text-field>
        </template>
      </v-card>
      <br />
      <v-btn class="w-25 text-amber-darken-3" variant="outlined">
        <router-link
          class="text-decoration-none text-amber-darken-3"
          @click="updateTitle"
          :to="`/list-detail/${listId}`"
          >Salvar
        </router-link>
      </v-btn>
    </v-container>
  </v-container>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Agdasima&display=swap");
.font {
  font-family: "Agdasima", sans-serif;
  font-size: 4rem;
}
</style>
