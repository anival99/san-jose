<template>
  <login.vue></login.vue>
  <v-app>
    <v-main>
      <div class="px-4">
        <!-- Barra de Navegación -->
        <v-app-bar  color="primary">
          <v-toolbar-title class="text-h5 font-weight-bold">
            Mi Aplicación
          </v-toolbar-title>
          
          <v-btn
             v-if="handleLogin = !handleLogin" 
             @click="handleLogin"
             to="/dashboard"
            prepend-icon="mdi-login"
            variant="text"
            class="mx-2"
          > 
            inicio de Sesión
          </v-btn> 

          

          <v-btn
            v-if="logout=!logou"
            @click="logout"
            to="/login"
            prepend-icon="mdi-logout"
            variant="text"
            class="mx-2"
          >
            cerrar Sesión
          </v-btn>
        </v-app-bar>

        <!-- Contenido Principal -->
        <router-view />

        <!-- Pie de Página -->
        <v-footer app color="primary" dark class="text-center">
          <div class="pt-2">
            <span>&copy; {{ currentYear }} Mi Aplicación</span>
          </div>
        </v-footer>
      </div>
    </v-main>
  </v-app>
</template> 

<script>

import Login  from './views/Login.vue';



export default {
  data() {
    return {
      nombre: "",
      contrasena: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.nombre, this.contrasena);
        localStorage.setItem("token", response.token);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Error en el login:", error);
      }
    },
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
