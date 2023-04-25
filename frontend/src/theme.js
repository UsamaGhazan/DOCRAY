import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: '#ff9e24',
        60: '#000066',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
  })
);

export default theme;
