import alias from "@rollup/plugin-alias"
import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import path from "path"
import { rollup } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import json from "@rollup/plugin-json"
import nodeExternals from 'rollup-plugin-node-externals'

const __dirname = new URL(".", import.meta.url).pathname

async function build() {
    const bundle = await rollup({
        input: path.resolve(__dirname, "./src/index.ts"),
        plugins: [
            alias({
                entries: {
                    "@": path.resolve(__dirname, "./src"),
                    "@kinkinko/onebot-sdk": path.resolve(__dirname, "../onebot-sdk/src"),
                },
            }),
            nodeResolve({
                extensions: [".ts", ".js"],
                preferBuiltins: true,
            }),
            commonjs(),
            esbuild({
                tsconfig: path.resolve(__dirname, "./tsconfig.json"),
            }),
            json(),
            nodeExternals(),
        ],
    })

    await bundle.write({
        file: path.resolve(__dirname, "./dist/index.js"),
        format: "cjs",
    })
}

build()
