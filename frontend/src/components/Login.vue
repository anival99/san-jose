<template>
  <v-container
    class="d-flex justify-center align-center"
    style="height: 100vh; background-color: #1e1e2f"
  >
    <v-card
      elevation="12"
      style="
        width: 400px;
        padding: 30px;
        border-radius: 15px;
        background-color: #ffffff;
      "
    >
      <v-card-title
        class="text-h5 text-center"
        style="font-weight: bold; color: #333333"
      >
        Welcome Back!
      </v-card-title>

      <v-card-subtitle
        class="text-center"
        style="color: #666666; margin-bottom: 20px; font-size: 14px"
      >
        Log in to your account
      </v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="nombre"
            label="Email"
            outlined
            dense
            hide-details
            style="background-color: #f9f9f9; border-radius: 8px"
            prepend-inner-icon="mdi-email"
          ></v-text-field>

          <v-text-field
            v-model="contrasena"
            label="Password"
            type="password"
            outlined
            dense
            hide-details
            style="
              background-color: #f9f9f9;
              border-radius: 8px;
              margin-top: 10px;
            "
            prepend-inner-icon="mdi-lock"
          ></v-text-field>

          <v-btn
            block
            color="primary"
            class="mt-4"
            @click="handleLogin"
            style="color: white; font-weight: bold; height: 45px"
          >
            Log In
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { login } from "../services/authService.js";

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
};
</script>
