<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { itemsApiMixin } from "@/api/itens";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
      items: [],
      title: "",
      newItem: null,
      listTitle: "",
      listId: this.$route.params.id,
    };
  },
  methods: {
    async showList() {
      try {
        const { data } = await this.view(this.listId);
        this.items = data.items;
        this.listTitle = data.title;
      } catch (err) {
        console.log(err);
      }
    },
    async createTask() {
      try {
        const item = {
          title: this.title,
          listId: this.listId,
        };
        const { data } = await this.createItem(item);
        this.items.push(data);
      } catch (err) {
        console.log(err);
      } finally {
        this.title = "";
      }
    },
    async deleteList() {
      try {
        await this.remove(this.listId);
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTask() {
      try {
        console.log(this.itemId);

        await this.removeItem(this.itemId);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.showList();
  },
};
</script>

<template>
  <v-container>
    <h1>{{ listTitle }}</h1>
  </v-container>

  <v-container>
    <v-text-field
      v-model="title"
      label="Criar tarefa"
      variant="solo"
      @keydown.enter="createTask"
    >
      <template v-slot:append-inner>
        <v-btn icon="mdi-plus-circle" variant="text" @click="createTask">
        </v-btn>
      </template>
    </v-text-field>

    <v-card v-if="items.length > 0">
      <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <v-checkbox-btn
              v-model="item.done"
              color="success"
            ></v-checkbox-btn>
          </template>
          <v-list-item-title>
            <span :class="item.done ? 'text-grey' : 'text-primary'">
              {{ item.title }}
            </span>
          </v-list-item-title>
          <template v-slot:append>
            <v-icon v-if="item.done" color="success">mdi-check</v-icon>
          </template>
          <v-btn @click="deleteTask">
            <v-icon color="red"> mdi-close </v-icon>
          </v-btn>
        </v-list-item>
      </template>
    </v-card>
    <br />

    <v-form @submit.prevent="createTask" class="w-50">
      <v-btn @click="deleteList"> Deletar Lista </v-btn>
    </v-form>
    <v-btn>
      <router-link to="/dashboard">Salvar </router-link>
    </v-btn>
  </v-container>
</template>
