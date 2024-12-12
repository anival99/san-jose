<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Inscripciones</h1>
        <v-btn @click="abrirDialogCrear" color="primary">Crear Inscripción</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="inscripciones" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="blue" small @click="abrirDialogEditar(item)">Editar</v-btn>
        <v-btn color="red" small @click="eliminarInscripcion(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Dialogo para crear y editar -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="esEdicion" class="headline">Editar Inscripción</span>
          <span v-else class="headline">Crear Inscripción</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Fecha de Inscripción"
                  v-model="formulario.fecha_inscripcion"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="usuarios"
                  label="Estudiante"
                  item-text="nombre_completo"
                  item-value="id"
                  v-model="formulario.id_usuario"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cerrarDialog">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="guardarInscripcion">Guardar</v-btn>
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
        { text: "Fecha de Inscripción", value: "fecha_inscripcion" },
        { text: "Estudiante", value: "estudiante" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      inscripciones: [],
      usuarios: [],
      dialog: false,
      esEdicion: false,
      formulario: {
        id: null,
        fecha_inscripcion: "",
        id_usuario: "",
      },
    };
  },
  methods: {
    // Cargar inscripciones desde el backend
    async fetchInscripciones() {
      try {
        const response = await axios.get("http://localhost:3000/api/inscripcion");
        this.inscripciones = response.data;
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
      }
    },

    // Cargar usuarios para el select
    async fetchUsuarios() {
      try {
        const response = await axios.get("http://localhost:3000/api/usuario");
        this.usuarios = response.data.map(user => ({
          ...user,
          nombre_completo: `${user.nombre} ${user.paterno} ${user.materno}`,
        }));
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },

    // Abrir el diálogo para crear una inscripción
    abrirDialogCrear() {
      this.esEdicion = false;
      this.formulario = {
        id: null,
        fecha_inscripcion: "",
        id_usuario: "",
      };
      this.dialog = true;
    },

    // Abrir el diálogo para editar una inscripción existente
    abrirDialogEditar(inscripcion) {
      this.esEdicion = true;
      this.formulario = { ...inscripcion };
      this.dialog = true;
    },

    // Guardar la inscripción (crear o editar)
    async guardarInscripcion() {
      try {
        if (this.esEdicion) {
          // Editar inscripción
          await axios.put(`http://localhost:3000/api/inscripcion/${this.formulario.id}`, {
            fecha_inscripcion: this.formulario.fecha_inscripcion,
            id_usuario: this.formulario.id_usuario,
          });
          console.log("Inscripción editada con éxito");
        } else {
          // Crear nueva inscripción
          await axios.post("http://localhost:3000/api/inscripcion", {
            fecha_inscripcion: this.formulario.fecha_inscripcion,
            id_usuario: this.formulario.id_usuario,
          });
          console.log("Inscripción creada con éxito");
        }
        this.cerrarDialog();
        this.fetchInscripciones();
      } catch (error) {
        console.error("Error al guardar la inscripción:", error);
      }
    },

    // Eliminar una inscripción
    async eliminarInscripcion(id) {
      try {
        await axios.delete(`http://localhost:3000/api/inscripcion/${id}`);
        console.log("Inscripción eliminada con éxito");
        this.fetchInscripciones();
      } catch (error) {
        console.error("Error al eliminar la inscripción:", error);
      }
    },

    // Cerrar el diálogo
    cerrarDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchInscripciones();
    this.fetchUsuarios();
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
