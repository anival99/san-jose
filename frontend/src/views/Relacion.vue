<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Gestión de Relaciones</h1>
          <v-btn @click="crearRelacion">Crear Relación</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="relaciones" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editarRelacion(item)">Editar</v-btn>
          <v-btn color="error" @click="eliminarRelacion(item.id)">Eliminar</v-btn>
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
          { text: "Tipo de Relación", value: "tipo" },
          { text: "Descripción", value: "descripcion" },
          { text: "Acciones", value: "actions", sortable: false },
        ],
        relaciones: [],
      };
    },
    methods: {
      async fetchRelaciones() {
        try {
          const response = await axios.get("http://localhost:3000/api/relacion");
          this.relaciones = response.data;
        } catch (error) {
          console.error("Error al obtener relaciones:", error);
        }
      },
      crearRelacion() {
        console.log("Crear Relación");
      },
      editarRelacion(relacion) {
        console.log("Editar Relación", relacion);
      },
      eliminarRelacion(id) {
        console.log("Eliminar Relación", id);
      },
    },
    mounted() {
      this.fetchRelaciones();
    },
  };
  </script>
  