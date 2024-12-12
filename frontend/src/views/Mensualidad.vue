<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Mensualidades</h1>
        <v-btn color="primary" @click="abrirDialogCrear">Crear Mensualidad</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="mensualidades" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="blue" @click="abrirDialogEditar(item)">Editar</v-btn>
        <v-btn small color="red" @click="eliminarMensualidad(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Diálogo para creación y edición -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ esEdicion ? 'Editar Mensualidad' : 'Crear Mensualidad' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  label="Estudiante"
                  :items="estudiantes"
                  item-text="nombre_completo"
                  item-value="id"
                  v-model="formulario.id_estudiante"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Monto"
                  type="number"
                  v-model="formulario.monto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Estado"
                  :items="['Pendiente', 'Pagada']"
                  v-model="formulario.estado"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" @click="cerrarDialog">Cancelar</v-btn>
          <v-btn text color="green darken-1" @click="guardarMensualidad">Guardar</v-btn>
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
      { text: "Fecha", value: "fecha" },
      { text: "Precio", value: "precio" },
      { text: "Gestión", value: "gestion" },
      { text: "Acciones", value: "actions", sortable: false },
      ],
      mensualidades: [],
      estudiantes: [],
      dialog: false,
      esEdicion: false,
      formulario: {
        id: null,
        id_estudiante: null,
        monto: null,
        estado: null,
      },
    };
  },
  methods: {
    async fetchMensualidades() {
      try {
      const response = await axios.get("http://localhost:3000/api/mensualidad");
      console.log("Mensualidades recibidas:", response.data); // Para verificar
      this.mensualidades = response.data;
    } catch (error) {
    console.error("Error al obtener mensualidades:", error);
    }
    },
    async fetchEstudiantes() {
      try {
        const response = await axios.get("http://localhost:3000/api/estudiante");
        this.estudiantes = response.data.map((estudiante) => ({
          id: estudiante.id,
          nombre_completo: `${estudiante.nombre} ${estudiante.paterno} ${estudiante.materno}`,
        }));
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    },
    abrirDialogCrear() {
      this.esEdicion = false;
      this.formulario = {
        id: null,
        id_estudiante: null,
        monto: null,
        estado: null,
      };
      this.dialog = true;
    },
    abrirDialogEditar(item) {
      this.esEdicion = true;
      this.formulario = { ...item };
      this.dialog = true;
    },
    async guardarMensualidad() {
      try {
        if (this.esEdicion) {
          await axios.put(`http://localhost:3000/api/mensualidad/${this.formulario.id}`, this.formulario);
        } else {
          await axios.post("http://localhost:3000/api/mensualidad", this.formulario);
        }
        this.cerrarDialog();
        this.fetchMensualidades();
      } catch (error) {
        console.error("Error al guardar mensualidad:", error);
      }
    },
    async eliminarMensualidad(id) {
      try {
        await axios.delete(`http://localhost:3000/api/mensualidad/${id}`);
        this.fetchMensualidades();
      } catch (error) {
        console.error("Error al eliminar mensualidad:", error);
      }
    },
    cerrarDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchMensualidades();
    this.fetchEstudiantes();
  },
};
</script>
