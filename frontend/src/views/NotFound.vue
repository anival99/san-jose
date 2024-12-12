<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1>Página No Encontrada</h1>
          <p>La página que buscas no existe.</p>
          <v-btn color="primary" @click="$router.push('/dashboard')">
            Volver al Dashboard
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 3rem;
    color: red;
  }
  </style>
  