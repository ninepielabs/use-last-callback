const { build } = require('esbuild')
const path = require('path')
const tsconfig = require('../tsconfig.json')

const RUNTIME_ROOT_DIR = process.cwd()

const entryPoints = [path.resolve('src/index.ts')]

const outdir = path.resolve(RUNTIME_ROOT_DIR, tsconfig.compilerOptions.outDir)

build({
  entryPoints,
  format: 'esm',
  outdir,
  external: ['react'],
  bundle: true
})
