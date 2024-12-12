<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Gestión de Padres o Tutores</h1>
          <v-btn @click="crearPadreTutor">Registrar Padre/Tutor</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="padresTutores" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editarPadreTutor(item)">Editar</v-btn>
          <v-btn color="error" @click="eliminarPadreTutor(item.id)">Eliminar</v-btn>
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
          { text: "Nombre", value: "nombre" },
          { text: "Relación", value: "relacion" },
          { text: "Teléfono", value: "telefono" },
          { text: "Acciones", value: "actions", sortable: false },
        ],
        padresTutores: [],
      };
    },
    methods: {
      async fetchPadresTutores() {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/padre_tutor"
          );
          this.padresTutores = response.data;
        } catch (error) {
          console.error("Error al obtener padres/tutores:", error);
        }
      },
      crearPadreTutor() {
        console.log("Registrar Padre/Tutor");
      },
      editarPadreTutor(padreTutor) {
        console.log("Editar Padre/Tutor", padreTutor);
      },
      eliminarPadreTutor(id) {
        console.log("Eliminar Padre/Tutor", id);
      },
    },
    mounted() {
      this.fetchPadresTutores();
    },
  };
  </script>
  