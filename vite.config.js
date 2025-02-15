import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const {VITE_GOOGLE_MAPS_API_KEY = ''} = loadEnv(mode, process.cwd(), '');
  const {VITE_GOOGLE_MAPS_MAP_ID = ''} = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(VITE_GOOGLE_MAPS_API_KEY),
      'process.env.VITE_GOOGLE_MAPS_MAP_ID': JSON.stringify(VITE_GOOGLE_MAPS_MAP_ID)
    },
    resolve: {
      alias: {
        '@vis.gl/react-google-maps/examples.js':
          'https://visgl.github.io/react-google-maps/scripts/examples.js'
      }
    },
    publicDir: true
  };
});
