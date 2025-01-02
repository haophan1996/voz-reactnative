import { StyleSheet } from 'react-native';
import Theme from './themeTypes'; // Import the Theme type

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    itemTitle: {
      fontSize: 16,
      color: theme.secondary,
      paddingBottom: 5,
    },
    itemTitleSticky: {
      fontSize: 16,
      color: theme.title_ticky,
      fontWeight: 'bold'
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
    container: {
      padding: 5,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.sectionSeperator,
    },
    itemLabel: {
      fontSize: 14,
      color: theme.text,
      paddingBottom: 5,
      // borderColor: theme.text, 
      // borderWidth:1, 
      // borderRadius: 2,
      // padding:2,
      // alignSelf: 'flex-start',
    },
    backgroundcolor: {
      flex: 1,
      backgroundColor: theme.background,
    },
    bottomVew: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.background.replace('1.0)', '.9)'), // Transparent background with some dark tint
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
  });

export default createStyles;
