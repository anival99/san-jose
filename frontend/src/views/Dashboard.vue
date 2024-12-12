<template>
  <v-app>
    <v-navigation-drawer app permanent color="blue-grey darken-4">
      <v-list>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="item in menuItems"
            :key="item.text"
            link
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <!-- Título principal -->
        <v-row>
          <v-col>
            <v-card elevation="2" class="pa-4 mb-4">
              <v-card-title class="headline red--text">
                Bienvenido al Dashboard
              </v-card-title>
              <v-card-subtitle>
                Aquí puedes gestionar y visualizar la información del sistema.
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <!-- Tarjetas de estadísticas -->
        <v-row>
          <v-col
            v-for="info in stats"
            :key="info.title"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card elevation="2" outlined>
              <v-card-title class="justify-center">
                <v-icon large color="primary">{{ info.icon }}</v-icon>
              </v-card-title>
              <v-card-text class="text-center">
                <h2 class="headline">{{ info.value }}</h2>
                <span>{{ info.title }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Sección de gráficos -->
        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>Estadísticas de Pagos</v-card-title>
              <v-card-text>
                <div style="height: 300px;">Gráfico aquí</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>Estudiantes por Curso</v-card-title>
              <v-card-text>
                <div style="height: 300px;">Gráfico aquí</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      menuItems: [
        { text: "Usuarios", icon: "mdi-account", route: "/usuarios" },
        { text: "Pagos", icon: "mdi-cash", route: "/pagos" },
        { text: "Cursos", icon: "mdi-school", route: "/cursos" },
        { text: "Materias", icon: "mdi-book-open", route: "/materias" },
        { text: "Estudiantes", icon: "mdi-account-group", route: "/estudiantes" },
        { text: "Inscripción", icon: "mdi-clipboard", route: "/inscripcion" },
        { text: "Maestro", icon: "mdi-teach", route: "/maestro" },
        { text: "Materia Gestión", icon: "mdi-format-list-bulleted", route: "/materiagestion" },
        { text: "Mensualidad", icon: "mdi-calendar", route: "/mensualidad" },
        { text: "Mora", icon: "mdi-alert", route: "/mora" },
        { text: "Padre/Tutor", icon: "mdi-account-child", route: "/padretutor" },
        { text: "Relación", icon: "mdi-link", route: "/relacion" },
      ],
      stats: [
        { title: "Usuarios Activos", value: 345, icon: "mdi-account" },
        { title: "Pagos Realizados", value: "$78,940", icon: "mdi-cash" },
        { title: "Cursos Activos", value: 15, icon: "mdi-school" },
        { title: "Materias Disponibles", value: 40, icon: "mdi-book-open" },
      ],
    };
  },
};
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
}
.v-navigation-drawer {
  width: 240px;
}
</style>
