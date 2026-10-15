/** Database / RLS tests. Requires `npm run db:test:start` (or TEST_DATABASE_URL). */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/supabase/tests/db'],
  testMatch: ['**/*.db.test.ts'],
  transform: { '^.+\\.[jt]sx?$': ['babel-jest', { presets: ['babel-preset-expo'] }] },
  testTimeout: 20000,
};
