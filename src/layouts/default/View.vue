<template>
  <v-main>
    <main class="w-100 h-100 d-flex align-center">
    <v-container class="h-75 w-75 rounded-xl bg-white d-flex align-center">
      <v-row class="h-100 w-100 d-flex flex-column flex-md-row align-center">
        <v-col class="w-50 h-100 d-flex align-center">
          <v-img
            class="rounded-xl rounded-be-0"
            src="/public/bg3.png"
            cover
          ></v-img>
        </v-col>

        <v-col
          class="w-50 h-100 d-flex justify-center align-center flex-column relative"
        >
    <router-view />
  </v-col>
      </v-row>
    </v-container>
  </main>
  </v-main>
</template>

<script setup>
  //
</script>

<style>

body {
  --sb-track-color: #f3bb7a;
  --sb-thumb-color: #ffffff;
  --sb-size: 10px;

  scrollbar-color: var(--sb-thumb-color) 
                   var(--sb-track-color);
}

body::-webkit-scrollbar {
  width: var(--sb-size) 
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
