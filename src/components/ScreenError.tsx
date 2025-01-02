import React from 'react';
import { View, Text } from 'react-native';
import createStyles from '../theme/stylesheet';
import useThemeMode from '../theme/useThemeMode';
 
type ErrorScreenProps = {
    error: string;
};

export default function ErrorScreen({ error }: ErrorScreenProps) {
    const styles = createStyles(useThemeMode());

    return (
        <View>
            <Text style={styles.itemText}>{error}</Text>
        </View>
    );
}