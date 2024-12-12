<template>
  <v-container class="mt-5">
    <v-card>
      <v-card-title>
        <v-row justify="space-between" align="center">
          <span class="text-h5">Gestión de Estudiantes</span>
          <v-btn color="primary" @click="abrirDialogoCrear">Agregar Estudiante</v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="estudiantes"
          item-value="id"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn small color="blue" @click="abrirDialogoEditar(item)">Editar</v-btn>
            <v-btn small color="red" @click="eliminarEstudiante(item.id)">Eliminar</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Diálogo para agregar/editar estudiantes -->
    <v-dialog v-model="dialogo" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogoEditar ? "Editar Estudiante" : "Agregar Estudiante" }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="formulario.nombre" label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="formulario.paterno" label="Apellido Paterno"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="formulario.materno" label="Apellido Materno"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="formulario.direccion" label="Dirección" rows="2"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="dialogo = false">Cancelar</v-btn>
          <v-btn text color="green" @click="guardarEstudiante">Guardar</v-btn>
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
      estudiantes: [],
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Apellido Paterno", value: "paterno" },
        { text: "Apellido Materno", value: "materno" },
        { text: "Dirección", value: "direccion" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      dialogo: false,
      dialogoEditar: false,
      formulario: {
        id: null,
        nombre: "",
        paterno: "",
        materno: "",
        direccion: "",
      },
    };
  },
  methods: {
    async fetchEstudiantes() {
      try {
        const response = await axios.get("http://localhost:3000/api/estudiante");
        this.estudiantes = response.data;
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
      }
    },
    abrirDialogoCrear() {
      this.limpiarFormulario();
      this.dialogoEditar = false;
      this.dialogo = true;
    },
    abrirDialogoEditar(estudiante) {
      this.formulario = { ...estudiante };
      this.dialogoEditar = true;
      this.dialogo = true;
    },
    async guardarEstudiante() {
      try {
        if (this.dialogoEditar) {
          // Editar estudiante
          await axios.put(
            `http://localhost:3000/api/estudiante/${this.formulario.id}`,
            this.formulario
          );
        } else {
          // Agregar estudiante
          await axios.post("http://localhost:3000/api/estudiante", this.formulario);
        }
        this.dialogo = false;
        this.fetchEstudiantes();
      } catch (error) {
        console.error("Error al guardar estudiante:", error);
      }
    },
    async eliminarEstudiante(id) {
      try {
        await axios.delete(`http://localhost:3000/api/estudiante/${id}`);
        this.fetchEstudiantes();
      } catch (error) {
        console.error("Error al eliminar estudiante:", error);
      }
    },
    limpiarFormulario() {
      this.formulario = {
        id: null,
        nombre: "",
        paterno: "",
        materno: "",
        direccion: "",
      };
    },
  },
  mounted() {
    this.fetchEstudiantes();
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
</style>
