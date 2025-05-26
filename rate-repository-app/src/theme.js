import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textAppBar: '#ffffff',
    textButton: '#ffffff',
    primary: '#0366d6',
    secondary: '#02a8d6',
    error: '#d73a4a',
    border: '#586069',
    bgAppBar: '#24292e',
    bgMain: '#e1e4e8',
    bgItem: 'white',
    bgSearch: 'white',
  },
  fontSizes: {
    body: 14,
    heading: 18,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
