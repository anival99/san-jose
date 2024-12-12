<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Cursos</h1>
        <v-btn color="primary" @click="abrirDialogoCrear">Crear Curso</v-btn>
      </v-col>
    </v-row>

    <!-- Tabla de cursos -->
    <v-data-table :headers="headers" :items="cursos" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" @click="abrirDialogoEditar(item)">Editar</v-btn>
        <v-btn color="error" @click="eliminarCurso(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Diálogo para crear/editar cursos -->
    <v-dialog v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogoEditar ? "Editar Curso" : "Crear Curso" }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formulario.nombre"
                  label="Nombre del Curso"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formulario.descripcion"
                  label="Descripción"
                  rows="4"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogo = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="guardarCurso">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

---

### Script:

```javascript
<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      cursos: [],
      dialogo: false,
      dialogoEditar: false,
      formulario: {
        id: null,
        nombre: "",
        descripcion: "",
      },
    };
  },
  methods: {
    async fetchCursos() {
      try {
        const response = await axios.get("http://localhost:3000/api/curso");
        this.cursos = response.data;
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    },
    abrirDialogoCrear() {
      this.limpiarFormulario();
      this.dialogoEditar = false;
      this.dialogo = true;
    },
    abrirDialogoEditar(curso) {
      this.formulario = { ...curso };
      this.dialogoEditar = true;
      this.dialogo = true;
    },
    async guardarCurso() {
      try {
        if (this.dialogoEditar) {
          // Editar un curso existente
          await axios.put(
            `http://localhost:3000/api/curso/${this.formulario.id}`,
            this.formulario
          );
        } else {
          // Crear un nuevo curso
          await axios.post("http://localhost:3000/api/curso", this.formulario);
        }
        this.dialogo = false;
        this.fetchCursos(); // Actualizar lista de cursos
      } catch (error) {
        console.error("Error al guardar el curso:", error);
      }
    },
    async eliminarCurso(id) {
      try {
        await axios.delete(`http://localhost:3000/api/curso/${id}`);
        this.fetchCursos(); // Actualizar lista de cursos
      } catch (error) {
        console.error("Error al eliminar el curso:", error);
      }
    },
    limpiarFormulario() {
      this.formulario = {
        id: null,
        nombre: "",
        descripcion: "",
      };
    },
  },
  mounted() {
    this.fetchCursos();
  },
};
</script>
