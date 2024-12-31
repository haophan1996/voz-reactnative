import { StyleSheet } from 'react-native';
import Theme from './themeTypes'; // Import the Theme type

const createStyles = (theme: Theme) =>
  StyleSheet.create({  
    itemTitle: {
      fontSize: 16,
      color: theme.secondary,
    },
    itemMeta: {
      fontSize: 14,
      color: theme.text,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingLeft: 5,
      paddingTop: 1,
      paddingBottom: 1,
      backgroundColor: theme.sectionSeperator,
      color: theme.text,
    },
    itemText: {
      padding: 5,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.sectionSeperator,
    },
    itemLabel: {
      fontSize: 14,
      color: theme.text,
    },
    backgroundcolor: {
      flex: 1,
      backgroundColor: theme.background
    }
  });

export default createStyles;
