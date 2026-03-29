import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.enoch.agriguide',
  appName: 'AgriGuide',
  webDir: 'dist',
  server: {
    androidScheme: "http"
  }
};

export default config;
