<template>
  <v-app>
    <v-main class="bg-white w-100 h-auto d-flex flex-column justify-center">
      <v-container
        class="bg-amber-lighten-4  h-auto w-75 rounded-xl d-flex align-center"
      >
        <v-col class="bg-white h-auto w-100 rounded-xl" >
          <router-view />
        </v-col>
      </v-container>
      <div class="w-25 mr-10 d-flex align-self-end img-container">
    <v-img
      src="/public/bee3.png"
      position="absolute"
      cover
    ></v-img>
  </div>
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>

<style>
.img-container {
  position: absolute;
  bottom: 35px;
}
</style>
