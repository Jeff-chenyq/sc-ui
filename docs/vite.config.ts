// import vue from '@vitejs/plugin-vue'
import path from 'path'
import { projRoot } from '@sc-ui/build'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: [
      // ...(process.env.DOC_ENV !== 'production'
      //   ? []
      //   : [
      //       {
      //         find: /^@jeffchen123\/sc-ui(\/(es|lib))?$/,
      //         replacement: path.resolve(projRoot, 'packages/sc-ui/index.ts')
      //       },
      //       {
      //         find: /^@jeffchen123\/sc-ui\/(es|lib)\/(.*)$/,
      //         replacement: `${path.resolve(projRoot, 'packages')}/$2`
      //       }
      //     ])
      // TODO 安装不上npm的包。。。后续修改
      ...[
        {
          find: /^@jeffchen123\/sc-ui(\/(es|lib))?$/,
          replacement: path.resolve(projRoot, 'packages/sc-ui/index.ts')
        },
        {
          find: /^@jeffchen123\/sc-ui\/(es|lib)\/(.*)$/,
          replacement: `${path.resolve(projRoot, 'packages')}/$2`
        }
      ]
    ]
  }
})
