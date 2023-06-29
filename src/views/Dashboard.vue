<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import ToDoList from "@/components/ToDo.vue";

import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoLists: [],
      listTitle: "",
      listId: this.$route.params.id,
      loading: false,
    };
  },
  components: {
    ToDoList,
  },
  methods: {
    async getLists() {
      this.loading = true;
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        console.log(err)
      }finally {
        this.loading = false;
      }
    },

  },
  mounted() {
    this.getLists();
  },
};
</script>
<template>
  <Loading v-if="loading"></Loading>
  <p class="text-amber-darken-1 text-center font"> Lists </p>
  <div class="d-flex flex-column align-center"> 

    <v-card class="w-75 ma-2 text-amber-darken-3" variant="outlined" v-for="list in toDoLists" :key="list.id">
    <router-link class="text-decoration-none text-amber-darken-3" :to="`/list-detail/${list.id}`">
      <v-card-title  > {{ list.title }}</v-card-title>
    </router-link>
  </v-card>
<br/>  
<v-btn class="text-amber-darken-3" variant="outlined">
    <router-link class="text-decoration-none text-amber-darken-3" to="/new-list">criar</router-link>
  </v-btn>
  </div>

</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Agdasima&display=swap');
.font{
  font-family: 'Agdasima', sans-serif;
  font-size: 4rem;
}

</style>