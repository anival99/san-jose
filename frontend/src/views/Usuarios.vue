<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Usuarios</h1>
        <v-btn color="primary" @click="abrirDialogoCrear">Crear Usuario</v-btn>
        <v-btn  to="/dashboard" color="secondary"class="mx-10"> inicio</v-btn>
      </v-col>
    </v-row>

    <!-- Tabla de usuarios -->
    <v-data-table :headers="headers" :items="usuarios" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" @click="abrirDialogoEditar(item)">Editar</v-btn>
        <v-btn color="error" @click="eliminarUsuario(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Diálogo para crear/editar -->
    <v-dialog v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogoEditar ? "Editar Usuario" : "Crear Usuario" }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="formulario.nombre" label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="formulario.email" label="Email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formulario.contrasena"
                  label="Contraseña"
                  type="password"
                  required
                  v-if="!dialogoEditar"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogo = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="guardarUsuario">Guardar</v-btn>
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
        { text: "Nombre", value: "nombre" },
        { text: "Email", value: "email" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      usuarios: [],
      dialogo: false,
      dialogoEditar: false,
      formulario: {
        id: null,
        nombre: "",
        email: "",
        contrasena: "",
      },
    };
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get("http://localhost:3000/api/usuario");
        this.usuarios = response.data;
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },
    abrirDialogoCrear() {
      this.limpiarFormulario();
      this.dialogoEditar = false;
      this.dialogo = true;
    },
    abrirDialogoEditar(usuario) {
      this.formulario = { ...usuario };
      this.dialogoEditar = true;
      this.dialogo = true;
    },
    async guardarUsuario() {
      try {
        if (this.dialogoEditar) {
          // Editar usuario
          await axios.put(`http://localhost:3000/api/usuario/${this.formulario.id}`, this.formulario);
        } else {
          // Crear nuevo usuario
          await axios.post("http://localhost:3000/api/usuario", this.formulario);
        }
        this.dialogo = false;
        this.fetchUsuarios(); // Actualizar lista
      } catch (error) {
        console.error("Error al guardar usuario:", error);
      }
    },
    async eliminarUsuario(id) {
      try {
        await axios.delete(`http://localhost:3000/api/usuario/${id}`);
        this.fetchUsuarios(); // Actualizar lista
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    },
    limpiarFormulario() {
      this.formulario = {
        id: null,
        nombre: "",
        email: "",
        contrasena: "",
      };
    },
  },
  mounted() {
    this.fetchUsuarios();
  },
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
