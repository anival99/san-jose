<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Gestión de Gestiones</h1>
          <v-btn @click="crearGestion">Crear Gestión</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="gestiones" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editarGestion(item)">Editar</v-btn>
          <v-btn color="error" @click="eliminarGestion(item.id)">Eliminar</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        headers: [
          { text: "Año", value: "anio" },
          { text: "Descripción", value: "descripcion" },
          { text: "Acciones", value: "actions", sortable: false },
        ],
        gestiones: [],
      };
    },
    methods: {
      async fetchGestiones() {
        try {
          const response = await axios.get("http://localhost:3000/api/gestion");
          this.gestiones = response.data;
        } catch (error) {
          console.error("Error al obtener gestiones:", error);
        }
      },
      crearGestion() {
        console.log("Crear Gestión");
      },
      editarGestion(gestion) {
        console.log("Editar Gestión", gestion);
      },
      eliminarGestion(id) {
        console.log("Eliminar Gestión", id);
      },
    },
    mounted() {
      this.fetchGestiones();
    },
  };
  </script>
