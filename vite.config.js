import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';
// import VitePWA for app 

const config = {
  plugins: [
    sveltekit(),
    basicSsl()
  ],
  server: {
    fs: {
      allow: ['static']
    },
  },
  resolve: {
    alias: {
      // set an alias so images can be dynamically imported
      $static: path.resolve('./static'),
    }
  }
};

export default config;
