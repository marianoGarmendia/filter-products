import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `https://marianogarmendia.github.io/filter-products/`,
});

// export default {
//   base: '/nombre-de-tu-repositorio/',
//   // ... otras configuraciones
// }
