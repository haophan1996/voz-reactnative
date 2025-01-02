/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSubitem } from './data/services';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import useThemeMode from './theme/useThemeMode';
import createStyles from './theme/stylesheet';
import { RootStackParamList, navigationProps } from './type';
import LoadingScreen from './components/ScreenLoading';
import ErrorScreen from './components/ScreenError';

type SubItemRouteProp = RouteProp<RootStackParamList, 'ScreenThreads'>;

export default function SubItem() {
    const navigation = useNavigation<navigationProps>();
    const route = useRoute<SubItemRouteProp>();
    const { linksubitem } = route.params;

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
        if (loading === true) {
            loadData();
        }
    }, [loading]);

    if (loading) { return <LoadingScreen />; }

    if (error) { return <ErrorScreen error={error} />; }

    return (
        <View style={styles.backgroundcolor}>
            <SectionList
                sections={data.content.data} // This should be an array of sections, each with a 'data' array
                keyExtractor={(item, index) => item.title + index} // Use item.title for unique key
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('ScreenThreads', {
                                itemId: 2,
                                appbartitle: item.title,
                                linksubitem: item.link,
                            });
                        }}
                        style={styles.container}>

                        <Text style={styles.itemLabel}>{item.label}<Text style={item.is_sticky ? styles.itemTitleSticky : styles.itemTitle}>{item.title}</Text></Text>
                        {item.is_thread ?
                            <Text style={styles.itemMeta}>Replies: {item.replies_count} 🗨️ {item.last_time_username_replies} ◽ {item.last_time_replies}</Text> :
                            <Text style={styles.itemMeta}>Threads: {item.thread} ● Messages: {item.messages}</Text>
                        }
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.headerText}>{section.title}</Text> // Access section.title
                )}
            />
            <View style={styles.bottomVew}>
                <Text style={styles.itemTitle}>{data.current_page} of {data.max_page}</Text>
            </View>
        </View>
    );
};
