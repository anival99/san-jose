<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Materias</h1>
        <v-btn color="primary" @click="abrirDialogoCrear">Crear Materia</v-btn>
      </v-col>
    </v-row>

    <!-- Tabla de materias -->
    <v-data-table :headers="headers" :items="materias" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" @click="abrirDialogoEditar(item)">Editar</v-btn>
        <v-btn color="error" @click="eliminarMateria(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Diálogo para crear/editar materias -->
    <v-dialog v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogoEditar ? "Editar Materia" : "Crear Materia" }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formulario.nombre"
                  label="Nombre de la Materia"
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
          <v-btn color="blue darken-1" text @click="guardarMateria">Guardar</v-btn>
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
      materias: [],
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
    async fetchMaterias() {
      try {
        const response = await axios.get("http://localhost:3000/api/materia");
        this.materias = response.data;
      } catch (error) {
        console.error("Error al obtener las materias:", error);
      }
    },
    abrirDialogoCrear() {
      this.limpiarFormulario();
      this.dialogoEditar = false;
      this.dialogo = true;
    },
    abrirDialogoEditar(materia) {
      this.formulario = { ...materia };
      this.dialogoEditar = true;
      this.dialogo = true;
    },
    async guardarMateria() {
      try {
        if (this.dialogoEditar) {
          // Editar una materia existente
          await axios.put(
            `http://localhost:3000/api/materia/${this.formulario.id}`,
            this.formulario
          );
        } else {
          // Crear una nueva materia
          await axios.post("http://localhost:3000/api/materia", this.formulario);
        }
        this.dialogo = false;
        this.fetchMaterias(); // Actualizar lista de materias
      } catch (error) {
        console.error("Error al guardar la materia:", error);
      }
    },
    async eliminarMateria(id) {
      try {
        await axios.delete(`http://localhost:3000/api/materia/${id}`);
        this.fetchMaterias(); // Actualizar lista de materias
      } catch (error) {
        console.error("Error al eliminar la materia:", error);
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
    this.fetchMaterias();
  },
};
</script>
