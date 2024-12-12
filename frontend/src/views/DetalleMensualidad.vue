<template>
    <v-container>
      <v-row>
        <v-col>
          <h1>Gestión de Detalles de Mensualidad</h1>
          <v-btn @click="crearDetalle">Crear Detalle</v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="detalles" class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editarDetalle(item)">Editar</v-btn>
          <v-btn color="error" @click="eliminarDetalle(item.id)">Eliminar</v-btn>
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
          { text: "Cantidad", value: "cantidad" },
          { text: "Descripción", value: "descripcion" },
          { text: "Acciones", value: "actions", sortable: false },
        ],
        detalles: [],
      };
    },
    methods: {
      async fetchDetalles() {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/detalle_mensualidad"
          );
          this.detalles = response.data;
        } catch (error) {
          console.error("Error al obtener detalles:", error);
        }
      },
      crearDetalle() {
        console.log("Crear Detalle");
      },
      editarDetalle(detalle) {
        console.log("Editar Detalle", detalle);
      },
      eliminarDetalle(id) {
        console.log("Eliminar Detalle", id);
      },
    },
    mounted() {
      this.fetchDetalles();
    },
  };
  </script>
  