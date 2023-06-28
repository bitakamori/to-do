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
      showModal: false,
      dialog: false,
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
    async deleteList() {
      this.showModal = !this.showModal;
      try {
        await this.remove(this.listId);
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    },
    async updatedTask(item) {
      try {
        let updatetask = {
          done: item.done,
        };
        await this.updateItem(item.id, updatetask);
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
    <v-card v-if="items.length > 0">
      <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <v-checkbox-btn
              @change="updatedTask(item)"
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
        </v-list-item>
      </template>
    </v-card>
    <br />

    <v-form @submit.prevent="deleteList" class="w-50">
      <v-btn>
        <v-dialog v-model="dialog" activator="parent">
          <v-card>
            <v-card-text>
              Tem certeza que deseja deletar essa lista?
            </v-card-text>
            <v-card-actions>
              <v-btn @click="deleteList">Sim </v-btn>
              <v-btn @click="dialog = false"> Não </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        Deletar Lista
      </v-btn>
    </v-form>
    <v-btn>
      <router-link to="/dashboard">Home </router-link>
    </v-btn>
    <v-btn>
      <router-link :to="`/edit-list/${listId}`">Editar </router-link>
    </v-btn>
  </v-container>
</template>
