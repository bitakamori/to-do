<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { itemsApiMixin } from "@/api/itens";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
      items: [],
      title: "",
      listTitle: "",
      listId: this.$route.params.id,
      newItem: null,
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
        this.showList();
      } catch (err) {
        console.log(err);
      } finally {
        this.title = "";
      }
    },
    async deleteTask(itemId) {
      try {
        await this.removeItem(itemId);
        this.showList();
      } catch (err) {
        console.log(err);
      }
    },
    async updateTitle() {
      const payload = {
        title: this.listTitle,
      };
      try {
        await this.updateList(this.listId, payload);
      } catch (err) {
        console.log(err);
      }
    },
    async updTask(id, title) {
      try {
        await this.updateItem(id, { title });
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
    <v-text-field
      v-model="listTitle"
      @keydown.enter="updateTitle"
      variant="solo"
    ></v-text-field>
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
          <v-list-item-title>
            <v-text-field
              @keydown.enter="updTask(item.id, item.title)"
              variant="solo"
              v-model="item.title"
            >
            </v-text-field>
          </v-list-item-title>
          <v-btn @click="updTask(item.id, item.title)">
            <v-icon color="green"> mdi-check </v-icon>
          </v-btn>
          <v-btn @click="deleteTask(item.id)">
            <v-icon color="red"> mdi-close </v-icon>
          </v-btn>
        </v-list-item>
      </template>
    </v-card>
    <br />
    <v-btn>
      <router-link @click="updateTitle" :to="`/list-detail/${listId}`"
        >Salvar
      </router-link>
    </v-btn>
  </v-container>
</template>
