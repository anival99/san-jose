<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Maestros</h1>
        <v-btn color="primary" @click="abrirDialogCrear">Crear Maestro</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="maestros" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="blue" @click="abrirDialogEditar(item)">Editar</v-btn>
        <v-btn small color="red" @click="eliminarMaestro(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Dialogo para crear y editar -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="esEdicion" class="headline">Editar Maestro</span>
          <span v-else class="headline">Crear Maestro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nombre" v-model="formulario.nombre"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Apellido Paterno" v-model="formulario.paterno"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Apellido Materno" v-model="formulario.materno"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Teléfono" v-model="formulario.telefono"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cerrarDialog">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="guardarMaestro">Guardar</v-btn>
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
        { text: "ID", value: "id" },
        { text: "Nombre Completo", value: "nombre_completo" },
        { text: "Teléfono", value: "telefono" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      maestros: [],
      dialog: false,
      esEdicion: false,
      formulario: {
        id: null,
        nombre: "",
        paterno: "",
        materno: "",
        telefono: "",
      },
    };
  },
  methods: {
    async fetchMaestros() {
      try {
        const response = await axios.get("http://localhost:3000/api/maestro");
        this.maestros = response.data.map(maestro => ({
          ...maestro,
          nombre_completo: `${maestro.nombre} ${maestro.paterno} ${maestro.materno}`,
        }));
      } catch (error) {
        console.error("Error al obtener maestros:", error);
      }
    },
    abrirDialogCrear() {
      this.esEdicion = false;
      this.formulario = {
        id: null,
        nombre: "",
        paterno: "",
        materno: "",
        telefono: "",
      };
      this.dialog = true;
    },
    abrirDialogEditar(maestro) {
      this.esEdicion = true;
      this.formulario = { ...maestro };
      this.dialog = true;
    },
    async guardarMaestro() {
      try {
        if (this.esEdicion) {
          await axios.put(`http://localhost:3000/api/maestro/${this.formulario.id}`, this.formulario);
          console.log("Maestro actualizado");
        } else {
          await axios.post("http://localhost:3000/api/maestro", this.formulario);
          console.log("Maestro creado");
        }
        this.cerrarDialog();
        this.fetchMaestros();
      } catch (error) {
        console.error("Error al guardar el maestro:", error);
      }
    },
    async eliminarMaestro(id) {
      try {
        await axios.delete(`http://localhost:3000/api/maestro/${id}`);
        console.log("Maestro eliminado");
        this.fetchMaestros();
      } catch (error) {
        console.error("Error al eliminar el maestro:", error);
      }
    },
    cerrarDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchMaestros();
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
