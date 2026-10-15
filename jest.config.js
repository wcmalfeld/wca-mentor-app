/**
 * `npm test` runs:
 *   - app:    React Native components + domain logic (jest-expo)
 *   - server: Edge Function logic (mentor handler, context, safety, provider) in Node
 * Database/RLS tests are separate (`npm run test:db`) because they need Postgres.
 */
module.exports = {
  projects: [
    {
      displayName: 'app',
      preset: 'jest-expo/ios',
      roots: ['<rootDir>/src'],
      testMatch: ['**/*.test.ts', '**/*.test.tsx'],
      setupFiles: ['<rootDir>/jest.setup.js'],
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@supabase/.*|standard-navigation)',
      ],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      roots: ['<rootDir>/supabase/tests/mentor'],
      testMatch: ['**/*.test.ts'],
      transform: { '^.+\\.[jt]sx?$': ['babel-jest', { presets: ['babel-preset-expo'] }] },
    },
  ],
};
