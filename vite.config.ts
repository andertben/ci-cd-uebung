import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
//    base: '/ci-cd-uebung/',
    base: "https://andertben.github.io/ci-cd-uebung/",
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
    }
})