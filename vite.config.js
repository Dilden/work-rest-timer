import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
// import VitePWA for app 

const config = {
  plugins: [
    sveltekit(),
    basicSsl()
  ]
};

export default config;
