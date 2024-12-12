<template>
  <div class="d-flex justify-center align-center" style="height: 100vh; background-color: #121212;">
    <v-card elevation="12" width="500" class="pa-8 mx-4" color="#1E1E1E">
      <v-card-title class="text-h5 text-center font-weight-bold mb-6 white--text">
        Iniciar Sesión
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="nombre"
            label="Nombre de usuario"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            required
            density="comfortable"
            class="mb-4"
            color="white"
            bg-color="#2C2C2C"
            theme="dark"
          ></v-text-field>

          <v-text-field
            v-model="contrasena"
            label="Contraseña"
            prepend-inner-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="outlined"
            required
            density="comfortable"
            class="mb-8"
            @click:append-inner="showPassword = !showPassword"
            color="white"
            bg-color="#2C2C2C"
            theme="dark"
          ></v-text-field>

          <v-btn  type="submit" color="#2196F3" block size="x-large" elevation="2">
            Ingresar
          </v-btn>
        </v-form>

        <v-alert v-if="error" type="error" variant="tonal" class="mt-4">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { login } from "../services/authService.js";

export default {
  data() {
    return {
      nombre: "",
      contrasena: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login(this.nombre, this.contrasena);
        console.log("Respuesta del login:", response); // Verifica si se recibe el token
        this.$router.push("/dashboard"); // Redirige al dashboard
      } catch (err) {
        console.error("Error en el login:", err.message);
        this.error = "Credenciales incorrectas";
      }
    },
  },
};
</script>
