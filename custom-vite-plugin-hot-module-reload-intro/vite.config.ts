import Csv from './vite-plugin-csv';
import {defineConfig} from "vite";
export default defineConfig({
    plugins: [
        Csv()
    ],
})