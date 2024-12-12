<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Materias por Gestión</h1>
        <v-btn color="primary" @click="abrirDialogCrear">Crear Materia</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="materiaGestion" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="blue" @click="abrirDialogEditar(item)">Editar</v-btn>
        <v-btn small color="red" @click="eliminarMateriaGestion(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Dialogo para crear y editar -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ esEdicion ? 'Editar Materia' : 'Crear Materia' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  label="Materia"
                  :items="materias"
                  item-text="nombre"
                  item-value="id"
                  v-model="formulario.id_materia"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Gestión"
                  :items="gestiones"
                  item-text="nombre"
                  item-value="id"
                  v-model="formulario.id_gestion"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" @click="cerrarDialog">Cancelar</v-btn>
          <v-btn text color="green darken-1" @click="guardarMateriaGestion">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        { text: "Materia", value: "materia" },
        { text: "Gestión", value: "gestion" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      materiaGestion: [],
      materias: [],
      gestiones: [],
      dialog: false,
      esEdicion: false,
      formulario: {
        id: null,
        id_materia: null,
        id_gestion: null,
      },
    };
  },
  methods: {
    async fetchMateriaGestion() {
      try {
    const response = await axios.get("http://localhost:3000/api/materiagestion");
    this.materiaGestion = response.data;
    console.log("Datos recibidos:", this.materiaGestion); // Agrega esta línea
  } catch (error) {
    console.error("Error al obtener materias por gestión:", error);
  }
    },
    async fetchMaterias() {
      try {
        const response = await axios.get("http://localhost:3000/api/materia");
        this.materias = response.data;
      } catch (error) {
        console.error("Error al obtener materias:", error);
      }
    },
    async fetchGestiones() {
      try {
        const response = await axios.get("http://localhost:3000/api/gestion");
        this.gestiones = response.data;
      } catch (error) {
        console.error("Error al obtener gestiones:", error);
      }
    },
    abrirDialogCrear() {
      this.esEdicion = false;
      this.formulario = {
        id: null,
        id_materia: null,
        id_gestion: null,
      };
      this.dialog = true;
    },
    abrirDialogEditar(item) {
      this.esEdicion = true;
      this.formulario = { ...item };
      this.dialog = true;
    },
    async guardarMateriaGestion() {
      try {
        if (this.esEdicion) {
          await axios.put(`http://localhost:3000/api/materia_gestion/${this.formulario.id}`, this.formulario);
        } else {
          await axios.post("http://localhost:3000/api/materia_gestion", this.formulario);
        }
        this.cerrarDialog();
        this.fetchMateriaGestion();
      } catch (error) {
        console.error("Error al guardar la relación materia-gestión:", error);
      }
    },
    async eliminarMateriaGestion(id) {
      try {
        await axios.delete(`http://localhost:3000/api/materia_gestion/${id}`);
        this.fetchMateriaGestion();
      } catch (error) {
        console.error("Error al eliminar la relación materia-gestión:", error);
      }
    },
    cerrarDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchMateriaGestion();
    this.fetchMaterias();
    this.fetchGestiones();
  },
};
</script>
