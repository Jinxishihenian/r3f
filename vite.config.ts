import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // 允许使用 IP 地址访问
        // port: 5173,       // 可选，设置开发服务器端口
    },
})
