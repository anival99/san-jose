<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Gestión de Cobranzas</h1>
          <v-btn @click="crearCobranza">Crear Cobranza</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="cobranzas" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editarCobranza(item)">Editar</v-btn>
          <v-btn color="error" @click="eliminarCobranza(item.id)">Eliminar</v-btn>
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
          { text: "Fecha", value: "fecha" },
          { text: "Monto Total", value: "monto_total" },
          { text: "Acciones", value: "actions", sortable: false },
        ],
        cobranzas: [],
      };
    },
    methods: {
      async fetchCobranzas() {
        try {
          const response = await axios.get("http://localhost:3000/api/cobranza");
          this.cobranzas = response.data;
        } catch (error) {
          console.error("Error al obtener cobranzas:", error);
        }
      },
      crearCobranza() {
        console.log("Crear Cobranza");
      },
      editarCobranza(cobranza) {
        console.log("Editar Cobranza", cobranza);
      },
      eliminarCobranza(id) {
        console.log("Eliminar Cobranza", id);
      },
    },
    mounted() {
      this.fetchCobranzas();
    },
  };
  </script>
  