import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  optimizeDeps: {
    include: ['antd'], // Assurez-vous d'inclure Ant Design ici si nécessaire
  },
});
