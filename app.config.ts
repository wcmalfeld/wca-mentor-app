import type { ExpoConfig } from 'expo/config';

/**
 * App configuration. Values that differ per environment or that you must
 * own (bundle id, EAS project id) come from env vars so nothing is invented
 * here. See docs/RELEASE.md.
 */
const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV ?? 'development';
const IS_PROD = APP_ENV === 'production';

// Placeholder until WCA registers an App ID in its Apple Developer account.
const BUNDLE_ID = process.env.IOS_BUNDLE_IDENTIFIER ?? 'com.example.wcamentor';
const EAS_PROJECT_ID = process.env.EAS_PROJECT_ID; // set after `eas init`

const config: ExpoConfig = {
  name: IS_PROD ? 'WCA Mentor' : `WCA Mentor (${APP_ENV})`,
  slug: 'wca-mentor',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'wcamentor',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: IS_PROD ? BUNDLE_ID : `${BUNDLE_ID}.${APP_ENV}`,
    supportsTablet: false,
    buildNumber: '1',
    config: { usesNonExemptEncryption: false },
    // No camera, location, contacts, microphone or tracking in the MVP, so no
    // usage-description strings are declared. Third-party SDK privacy manifests
    // ship with the libraries; review the generated manifest before submission.
    privacyManifests: { NSPrivacyTracking: false, NSPrivacyTrackingDomains: [] },
  },
  android: {
    package: BUNDLE_ID.replace(/-/g, '_'),
    adaptiveIcon: {
      backgroundColor: '#1F4D3A',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
  },
  web: { output: 'static', favicon: './assets/images/favicon.png' },
  plugins: [
    'expo-router',
    'expo-secure-store',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#F6F3EC',
        image: './assets/images/splash-icon.png',
        imageWidth: 120,
        dark: { backgroundColor: '#111412', image: './assets/images/splash-icon.png' },
      },
    ],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
  extra: {
    appEnv: APP_ENV,
    ...(EAS_PROJECT_ID ? { eas: { projectId: EAS_PROJECT_ID } } : {}),
  },
};

export default config;
