<template>
  <v-container>
    <!-- Título del Dashboard -->
    <v-row justify="center">
      <v-col cols="12" class="text-center my-5">
        <h1 class="text-h4 font-weight-bold">Bienvenido al Dashboard</h1>
        <p>Selecciona una opción para gestionar los módulos de tu sistema</p>
      </v-col>
    </v-row>

    <!-- Cuadrícula de Tarjetas -->
    <v-row justify="center" align ="center">
      <v-col cols="12" sm="6" md="4" lg="3" v-for="item in gestiones" :key="item.nombre">
        <v-card class="mx-auto" elevation="3">
          <v-card-title class="text-h6 font-weight-bold text-center">{{ item.nombre }}</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn :color="item.color" :to="item.ruta" block>Gestionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      gestiones: [
        { nombre: "Usuarios", ruta: "/usuarios", color: "primary" },
        { nombre: "Pagos", ruta: "/pagos", color: "secondary" },
        { nombre: "Cursos", ruta: "/cursos", color: "success" },
        { nombre: "Materias", ruta: "/materias", color: "error" },
        { nombre: "Estudiantes", ruta: "/estudiantes", color: "info" },
        { nombre: "Cobranza", ruta: "/cobranza", color: "warning" },
        { nombre: "Detalle Mensualidad", ruta: "/detallemensualidad", color: "pink" },
        { nombre: "Gestión", ruta: "/gestion", color: "teal" },
        { nombre: "Inscripción", ruta: "/inscripcion", color: "purple" },
        { nombre: "Maestro", ruta: "/maestro", color: "cyan" },
        { nombre: "Materia Gestión", ruta: "/materiagestion", color: "amber" },
        { nombre: "Mensualidad", ruta: "/mensualidad", color: "lime" },
        { nombre: "Mora", ruta: "/mora", color: "brown" },
        { nombre: "Padre Tutor", ruta: "/padretutor", color: "blue-grey" },
        { nombre: "Relación", ruta: "/relacion", color: "deep-orange" },
      ],
    };
  },
};
</script>

<style>
/* Espaciado adicional para el Dashboard */
.my-5 {
  margin: 2rem 0;
}
</style>
