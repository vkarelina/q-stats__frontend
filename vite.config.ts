import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default ({ mode }: ConfigEnv) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
    plugins: [react(), 
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
        include: '**/*.svg',
      }),
    ],
    server: {
      port: Number(process.env.VITE_API_PORT),
    },
  });
}
