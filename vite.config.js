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
        globPatterns: ['**/*.{js,css,html,ico,png,wav}']
      },
      includeAssets: ['beep.wav', 'timer.png', 'favicon.ico', 'favicon.png', 'icon-512.png', 'timer-512.png', 'apple-touch-icon.png', 'timer-180.png', 'timer-190.png', 'timer-192.png', 'timer-196.png', 'timer-300.png'],
      manifest: {
        name: 'Work Rest Timer',
        short_name: 'Work Rest Timer',
        description: 'A timer that tracks active + rest time. And it reminds you to start!',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: 'timer.png',
            sizes: '1100x1100',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '564x564',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '198x198',
            type: 'image/png'
          },
          {
            src: 'timer-512.png',
            sizes: '564x564',
            type: 'image/png'
          },
          {
            src: 'timer-196.png',
            sizes: '216x216',
            type: 'image/png'
          },
          {
            src: 'timer-192.png',
            sizes: '212x212',
            type: 'image/png'
          },
          {
            src: 'timer-190.png',
            sizes: '209x209',
            type: 'image/png'
          },
          {
            src: 'timer-180.png',
            sizes: '198x198',
            type: 'image/png'
          },
          {
            src: 'timer-64.png',
            sizes: '71x71',
            type: 'image/png'
          },
          {
            src: 'timer-32.png',
            sizes: '36x36',
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
