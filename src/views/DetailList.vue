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
      newItem: null,
      listTitle: "",
      listId: this.$route.params.id,
      showModal: false,
      dialog: false,
      loading: false,
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
      } finally {
        this.loading = false;
      }
    },
    async deleteList() {
      this.showModal = !this.showModal;
      try {
        await this.remove(this.listId);
        this.$router.push("/dashboard");
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
      }
    },
    async updatedTask(item) {
      try {
        let updatetask = {
          done: item.done,
        };
        await this.updateItem(item.id, updatetask);
      } catch (err) {
        alert("Algo deu errado, atualiza a pagina que vai, confia.");
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
  <v-container>
    <p class="text-amber-darken-1 text-center font">{{ listTitle }}</p>
  </v-container>

  <v-container class="text-amber-darken-1 d-flex flex-column align-center">
    <v-card
      variant="underlined"
      class="w-auto text-amber-darken-1"
      v-if="items.length > 0"
    >
      <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
        <v-list-item variant="underlined" class="w-100 text-amber-darken-1">
          <template v-slot:prepend>
            <v-checkbox-btn
              @change="updatedTask(item)"
              v-model="item.done"
            ></v-checkbox-btn>
          </template>
          <span
            class="fontTask"
            :class="
              item.done
                ? 'text-amber-darken-1 text-decoration-line-through'
                : 'text-amber-darken-3'
            "
          >
            {{ item.title }}
          </span>
          <template v-slot:append>
            <v-icon v-if="item.done">mdi-check</v-icon>
          </template>
        </v-list-item>
      </template>
    </v-card>
    <br />

    <div class="d-flex flex-md-row flex-column justify-center align-center">
      <v-btn class="text-amber-darken-3 mr-md-5 mb-3 mb-md-0" variant="outlined">
        <v-dialog class="w-25" v-model="dialog" activator="parent">
          <v-card class="">
            <v-card-text
              class="text-amber-darken-4 text-overline d-flex justify-center text-center"
            >
              Tem certeza que deseja deletar "{{ listTitle }}"?
            </v-card-text>
            <v-card-actions class="text-amber-darken-4 d-flex justify-center">
              <v-btn @click="deleteList">Sim </v-btn>
              <v-btn @click="dialog = false"> Não </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        Deletar Lista
      </v-btn>
      <v-btn class="text-amber-darken-3 mr-md-5 mb-3 mb-md-0" variant="outlined">
        <router-link
          class="text-decoration-none text-amber-darken-3"
          :to="`/edit-list/${listId}`"
          >Editar
        </router-link>
      </v-btn>
      <v-btn
        class="text-amber-darken-3"
        variant="outlined"
      >
        <router-link
          class="text-decoration-none text-amber-darken-3"
          to="/dashboard"
          >Home
        </router-link>
      </v-btn>
    </div>
  </v-container>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Agdasima&display=swap");
.font {
  font-family: "Agdasima", sans-serif;
  font-size: 3rem;
}

.fontTask {
  font-family: "Agdasima", sans-serif;
  font-size: 1.5rem;
}
</style>
