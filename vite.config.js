import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default {
    plugins: [vue()],
    server: {
        host: '0.0.0.0', // Allow connections from any IP
        port: 5000, // Bind to port 80
    },
};
