
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default () => {
  return defineConfig({
    plugins: [
      viteSingleFile(),
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/@crestron/ch5-crcomlib/build_bundles/umd/cr-com-lib.js',
            dest: ''
          },
          {
            src: 'node_modules/@crestron/ch5-webxpanel/dist/umd/index.js',
            dest: ''
          },
          {
            src: 'node_modules/@crestron/ch5-webxpanel/dist/umd/d4412f0cafef4f213591.worker.js',
            dest: ''
          }
        ]
      }),
    ],
    base: './',
  });
};