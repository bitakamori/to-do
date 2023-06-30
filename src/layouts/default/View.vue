<template>
  <v-main>
    <main class="w-100 h-100 d-flex align-center widt">
      <v-container class="h-75 w-75 rounded-xl bg-white d-flex align-md-center">
        <v-row class="h-100 w-100 d-flex flex-column flex-row align-center">
          <v-col class="w-50 h-100 d-none d-md-flex align-center " :class="meio">
            <v-img
              class="rounded-xl rounded-be-0 d-none d-md-flex"
              src="/public/bg3.png"
              cover
            ></v-img>
          </v-col>

          <v-col
            class="w-50 h-100 d-flex justify-center align-center flex-column relative"
            :class="meio"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </main>
  </v-main>
</template>

<script>
export default {
  computed: {
    meio() {
      return {
        "w-100": this.$vuetify.display.smAndDown,
        "h-50": this.$vuetify.display.smAndDown,
      };
    },
  },
};
</script>

<style>


body {
  --sb-track-color: #f3bb7a;
  --sb-thumb-color: #f3bb7a;
  --sb-size: 10px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}

body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
}
</style>
