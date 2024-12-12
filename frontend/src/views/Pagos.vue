<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Gestión de Pagos</h1>
        <v-btn color="primary" @click="abrirDialogoCrear">Registrar Pago</v-btn>
         <v-btn  to="/dashboard" color="secondary"class="mx-10"> inicio</v-btn>
      </v-col>
    </v-row>
    
    <!-- Tabla de pagos -->
    <v-data-table :headers="headers" :items="pagos" class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" @click="abrirDialogoEditar(item)">Editar</v-btn>
        <v-btn color="error" @click="eliminarPago(item.id)">Eliminar</v-btn>
      </template>
    </v-data-table>

    <!-- Diálogo para registrar/editar pagos -->
    <v-dialog v-model="dialogo" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogoEditar ? "Editar Pago" : "Registrar Pago" }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formulario.monto"
                  label="Monto"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formulario.fecha"
                  label="Fecha"
                  type="date"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogo = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="guardarPago">Guardar</v-btn>
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
        { text: "Monto", value: "monto" },
        { text: "Fecha", value: "fecha" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      pagos: [],
      dialogo: false,
      dialogoEditar: false,
      formulario: {
        id: null,
        monto: "",
        fecha: "",
      },
    };
  },
  methods: {
    async fetchPagos() {
      try {
        const response = await axios.get("http://localhost:3000/api/pago");
        this.pagos = response.data;
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
      }
    },
    abrirDialogoCrear() {
      this.limpiarFormulario();
      this.dialogoEditar = false;
      this.dialogo = true;
    },
    abrirDialogoEditar(pago) {
      this.formulario = { ...pago };
      this.dialogoEditar = true;
      this.dialogo = true;
    },
    async guardarPago() {
      try {
        if (this.dialogoEditar) {
          // Editar un pago existente
          await axios.put(
            `http://localhost:3000/api/pago/${this.formulario.id}`,
            this.formulario
          );
        } else {
          // Crear un nuevo pago
          await axios.post("http://localhost:3000/api/pago", this.formulario);
        }
        this.dialogo = false;
        this.fetchPagos(); // Actualizar lista de pagos
      } catch (error) {
        console.error("Error al guardar el pago:", error);
      }
    },
    async eliminarPago(id) {
      try {
        await axios.delete(`http://localhost:3000/api/pago/${id}`);
        this.fetchPagos(); // Actualizar lista de pagos
      } catch (error) {
        console.error("Error al eliminar el pago:", error);
      }
    },
    limpiarFormulario() {
      this.formulario = {
        id: null,
        monto: "",
        fecha: "",
      };
    },
  },
  mounted() {
    this.fetchPagos();
  },
};
</script>
