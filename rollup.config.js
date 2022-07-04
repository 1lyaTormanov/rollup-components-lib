import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import image from '@rollup/plugin-image';
import scss from 'rollup-plugin-scss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from '@svgr/rollup'
import dts from "rollup-plugin-dts";
import path from 'path'
const packageJson = require("./package.json");

export default [
    {
        input: "./src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        experimentalCodeSplitting: true,
        plugins: [
            nodeResolve({extensions: ['.tsx','.ts']}),
            commonjs(),
            typescript({ tsconfig: path.resolve(__dirname, 'tsconfig.json') }),
            terser(),
            peerDepsExternal(),
            scss(),
            svgr(),
            image()
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.(scss|css)$/],
    },
];