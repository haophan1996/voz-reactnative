import { StyleSheet } from 'react-native';
import { Theme } from './theme'; // Import the Theme type

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    itemTitle: {
      fontSize: 16,
      color: theme.primary,
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
      backgroundColor: theme.secondary,
      color: theme.text,
    },
    itemText: {
      padding: 5,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.secondary,
    },
    itemLabel: {
      fontSize: 14,
      color: theme.text,
    },
  });

export default createStyles;
