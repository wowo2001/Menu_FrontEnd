import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default {
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias @ to the src folder
        },
    },
    server: {
        host: '0.0.0.0', // Allow connections from any IP
        port: 80, // Bind to port 80
    },
};
