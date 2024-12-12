import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

// Importar las vistas para cada CRUD
import Usuarios from "../views/Usuarios.vue";
import Pagos from "../views/Pagos.vue";
import Cursos from "../views/Cursos.vue";
import Materias from "../views/Materias.vue";
import Estudiantes from "../views/Estudiantes.vue";
import Cobranza from "../views/Cobranza.vue";
import DetalleMensualidad from "../views/DetalleMensualidad.vue";
import Gestion from "../views/Gestion.vue";
import Inscripcion from "../views/Inscripcion.vue";
import Maestro from "../views/Maestro.vue";
import MateriaGestion from "../views/MateriaGestion.vue";
import Mensualidad from "../views/Mensualidad.vue";
import Mora from "../views/Mora.vue";
import PadreTutor from "../views/PadreTutor.vue";
import Relacion from "../views/Relacion.vue";

const routes = [
  // Ruta inicial redirige a Login
  { path: "/", redirect: "/login" },

  // Rutas Públicas
  { path: "/login", name: "Login", component: Login },

  // Rutas Protegidas (requieren autenticación)
  { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/usuarios", name: "Usuarios", component: Usuarios, meta: { requiresAuth: true } },
  { path: "/pagos", name: "Pagos", component: Pagos, meta: { requiresAuth: true } },
  { path: "/cursos", name: "Cursos", component: Cursos, meta: { requiresAuth: true } },
  { path: "/materias", name: "Materias", component: Materias, meta: { requiresAuth: true } },
  { path: "/estudiantes", name: "Estudiantes", component: Estudiantes, meta: { requiresAuth: true } },
  { path: "/cobranza", name: "Cobranza", component: Cobranza, meta: { requiresAuth: true } },
  { path: "/detallemensualidad", name: "DetalleMensualidad", component: DetalleMensualidad, meta: { requiresAuth: true } },
  { path: "/gestion", name: "Gestion", component: Gestion, meta: { requiresAuth: true } },
  { path: "/inscripcion", name: "Inscripcion", component: Inscripcion, meta: { requiresAuth: true } },
  { path: "/maestro", name: "Maestro", component: Maestro, meta: { requiresAuth: true } },
  { path: "/materiagestion", name: "MateriaGestion", component: MateriaGestion, meta: { requiresAuth: true } },
  { path: "/mensualidad", name: "Mensualidad", component: Mensualidad, meta: { requiresAuth: true } },
  { path: "/mora", name: "Mora", component: Mora, meta: { requiresAuth: true } },
  { path: "/padretutor", name: "PadreTutor", component: PadreTutor, meta: { requiresAuth: true } },
  { path: "/relacion", name: "Relacion", component: Relacion, meta: { requiresAuth: true } },

  // Ruta de no encontrado
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("../views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger las rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Comprueba si el usuario tiene un token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirige a login si no está autenticado
  } else {
    next(); // Permite el acceso si está autenticado o no necesita autenticación
  }
});

export default router;
