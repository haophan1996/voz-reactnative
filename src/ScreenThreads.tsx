import { View, Text, SectionList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSubitem } from './data/services';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use React Navigation 
import useThemeMode from './theme/useThemeMode';
import createStyles from './theme/stylesheet';
import { RootStackParamList, navigationProps } from './type'; // Import the route params type
import { RouteProp } from '@react-navigation/native';

type SubItemRouteProp = RouteProp<RootStackParamList, 'ScreenThreads'>;

export default function SubItem() {
    const navigation = useNavigation<navigationProps>();
    const route = useRoute<SubItemRouteProp>();
    const { itemId, appbartitle, linksubitem } = route.params;

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const styles = createStyles(useThemeMode());

    const loadData = async () => {

        try {
            const result = await fetchSubitem(linksubitem);
            setData(result);
        } catch (err) {
            console.log(err);
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        if (loading) loadData(); 
    }, [navigation, appbartitle, loading]);
    if (loading) {
        return (
            <View >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text style={styles.itemLabel}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.backgroundcolor}>
            <SectionList
                sections={data.content.data} // This should be an array of sections, each with a 'data' array
                keyExtractor={(item, index) => item.title + index} // Use item.title for unique key
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            // Navigate to "SubItem" screen and pass parameters
                            navigation.push('ScreenThreads', {
                                itemId: 2,
                                appbartitle: item.title,
                                linksubitem: item.link,
                            });
                        }}
                        style={styles.itemText}>
                        <Text style={styles.itemLabel}>{item.label}<Text style={styles.itemTitle}>{item.title} {"\n"}</Text></Text>
                        {
                            item.is_thread ?
                                <Text style={styles.itemMeta}>Replies: {item.replies_count} 🗨️ {item.last_time_username_replies} ◽ {item.last_time_replies}</Text> :
                                <Text style={styles.itemMeta}>Threads: {item.thread} ● Messages: {item.messages}</Text>

                        }
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.headerText}>{section.title}</Text> // Access section.title
                )}
            />
        </View>
    );
};
