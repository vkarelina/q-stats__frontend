import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: any) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
    plugins: [react()],
    server: {
      port: Number(process.env.VITE_API_PORT),
    },
  });
}

