// Native modules that have no JS implementation under Jest.
jest.mock('expo-symbols', () => {
  const { View } = require('react-native');
  return { SymbolView: (props) => require('react').createElement(View, { testID: `icon-${props.name}` }) };
});
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);
