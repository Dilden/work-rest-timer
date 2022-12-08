import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const config = {
  plugins: [
    sveltekit(),
    basicSsl(),
    SvelteKitPWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,wav}']
      },
      includeAssets: ['beep.wav', 'timer.png', 'favicon.ico', 'favicon.png', 'icon-512.png', 'timer-512.png', 'apple-touch-icon.png', 'timer-180.png', 'timer-190.png', 'timer-192.png', 'timer-196.png', 'timer-300.png'],
      manifest: {
        name: 'Work Rest Timer',
        short_name: 'WorkRestTimer',
        description: 'A timer that tracks active + rest time. And it reminds you to start!',
        theme_color: '#ffffff',
        background_color: '#213439',
        start_url: '/',
        display: 'fullscreen',
        icons: [
          {
            src: 'timer.png',
            sizes: '1000x1000',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'timer-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'timer-196.png',
            sizes: '196x196',
            type: 'image/png'
          },
          {
            src: 'timer-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'timer-190.png',
            sizes: '190x190',
            type: 'image/png'
          },
          {
            src: 'timer-180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'timer-64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'timer-32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'favicon.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'favicon.ico',
            sizes: '32x32',
            type: 'image/png'
          }
        ]
      }
    })
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
  },
  build: {
    modulePreload: false
  }
};

export default config;
