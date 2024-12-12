<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Moras</h1>
        <v-btn color="primary" @click="abrirDialogCrear">Registrar Mora</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="moras" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small color="blue" @click="abrirDialogEditar(item)">Editar</v-btn>
        <v-btn small color="red" @click="eliminarMora(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Dialogo para crear y editar -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ esEdicion ? 'Editar Mora' : 'Registrar Mora' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Monto Pendiente"
                  v-model="formulario.monto_pendiente"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Fecha de Vencimiento"
                  v-model="formulario.fecha_vencimiento"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Descripción"
                  v-model="formulario.descripcion"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Cobranza"
                  :items="cobranzas"
                  item-text="id"
                  item-value="id"
                  v-model="formulario.id_cobranza"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" @click="cerrarDialog">Cancelar</v-btn>
          <v-btn text color="green darken-1" @click="guardarMora">Guardar</v-btn>
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
        { text: "Estudiante", value: "estudiante_nombre" },
        { text: "Monto Pendiente", value: "monto" },
        { text: "Fecha de Vencimiento", value: "fecha_vencimiento" },
        { text: "Descripción", value: "descripcion" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      moras: [],
      cobranzas: [],
      dialog: false,
      esEdicion: false,
      formulario: {
        id: null,
        monto_pendiente: null,
        fecha_vencimiento: null,
        descripcion: "",
        id_cobranza: null,
      },
    };
  },
  methods: {
    // Cargar datos de moras
    async fetchMoras() {
      try {
        const response = await axios.get("http://localhost:3000/api/mora");
        this.moras = response.data;
      } catch (error) {
        console.error("Error al obtener moras:", error);
      }
    },
    // Cargar cobranzas para el select
    async fetchCobranzas() {
      try {
        const response = await axios.get("http://localhost:3000/api/cobranza");
        this.cobranzas = response.data;
      } catch (error) {
        console.error("Error al obtener cobranzas:", error);
      }
    },
    abrirDialogCrear() {
      this.esEdicion = false;
      this.formulario = {
        id: null,
        monto_pendiente: null,
        fecha_vencimiento: null,
        descripcion: "",
        id_cobranza: null,
      };
      this.dialog = true;
    },
    abrirDialogEditar(item) {
      this.esEdicion = true;
      this.formulario = { ...item };
      this.dialog = true;
    },
    async guardarMora() {
      try {
        if (this.esEdicion) {
          await axios.put(
            `http://localhost:3000/api/mora/${this.formulario.id}`,
            this.formulario
          );
        } else {
          await axios.post("http://localhost:3000/api/mora", this.formulario);
        }
        this.cerrarDialog();
        this.fetchMoras();
      } catch (error) {
        console.error("Error al guardar la mora:", error);
      }
    },
    async eliminarMora(id) {
      try {
        await axios.delete(`http://localhost:3000/api/mora/${id}`);
        this.fetchMoras();
      } catch (error) {
        console.error("Error al eliminar la mora:", error);
      }
    },
    cerrarDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchMoras();
    this.fetchCobranzas();
  },
};
</script>
