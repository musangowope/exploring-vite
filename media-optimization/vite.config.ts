import Inspect from 'vite-plugin-inspect';
import imagemin from 'unplugin-imagemin/vite';
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [
        Inspect(),
        imagemin({
            mode: 'sharp',
            compress: {
                jpg: {
                    quality: 10,
                },
                jpeg: {
                    quality: 10,
                },
                png: {
                    quality: 10,
                },
                webp: {
                    quality: 10,
                },
            }
        }),
    ],
})