<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import ToDoList from "@/components/ToDo.vue";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoLists: [],
      listTitle: "",
      listId: this.$route.params.id,
    };
  },
  components: {
    ToDoList,
  },
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        console.log(err)
      }
    },

  },
  mounted() {
    this.getLists();
  },
};
</script>
<template>
  <v-card v-for="list in toDoLists" :key="list.id">
    <router-link :to="`/list-detail/${list.id}`">
      <v-card-title> {{ list.title }}</v-card-title>
    </router-link>
  </v-card>
<br/>
  <v-btn>
    <router-link to="/new-list">criar</router-link>
  </v-btn>

</template>
