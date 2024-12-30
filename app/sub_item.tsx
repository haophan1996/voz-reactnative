import { View, Text, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSubitem } from './data/services';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Link } from 'expo-router'; 
import { useThemeMode } from './theme/useThemeMode';
import createStyles from './theme/stylesheet';  

export default function subitem() {
    const navigation = useNavigation();
    const { appbartitle, linksubitem } = useLocalSearchParams<{ appbartitle: string, linksubitem: string }>();
    const [data, setdata] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);
    const [error, setError] = useState<any>('') 
    const styles = createStyles(useThemeMode());


    const loadData = async () => {
        try {
            const result = await fetchSubitem(linksubitem);
            setdata(result)
        } catch (err) {
            console.log(err)
            setError(String(err));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        navigation.setOptions({ title: appbartitle });
        if (loading == true)
            loadData();
    }, [navigation, appbartitle]);

    if (loading) {
        return (
            <View >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View >
                <Text>{error}</Text>
            </View>
        );
    }


    return (
        <View style={{ flex: 1 }}>
            <SectionList
                sections={data} // This should be an array of sections, each with a 'data' array
                keyExtractor={(item, index) => item.title + index} // Use item.title for unique key
                renderItem={({ item }) => (
                    <Link href={{
                        pathname: '/sub_item',
                        params: { appbartitle: item.title, linksubitem: item.link }
                    }} style={styles.itemText}>
                        <Text style={styles.itemLabel}>{item.label}</Text>
                        <Text style={styles.itemTitle}>{item.title} {"\n"}</Text>
                        {
                            item.is_thread ?
                                <Text style={styles.itemMeta}>Replies: {item.replies_count} 🗨️ {item.last_time_username_replies}◽{item.last_time_replies}</Text> :
                                <Text style={styles.itemMeta}>Threads: {item.thread} ● Messages: {item.messages}</Text>
                        } 
                    </Link>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.headerText}>{section.title}</Text> // Access section.section
                )}
            />
        </View>
    );
};



// const createStyles = (theme) =>
//     StyleSheet.create({
//         container: {
//             flex: 1,
//             backgroundColor: theme.background,
//         },
//         centered: {
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: theme.background,
//         },
//         itemTitle: {
//             alignItems: 'center',
//             fontSize: 16,
//             color: theme.primary,
//         },
//         itemMeta: {
//             fontSize: 14,
//             color: theme.text,
//         },
//         headerText: {
//             fontSize: 18,
//             fontWeight: 'bold',
//             paddingLeft: 5,
//             paddingTop: 1,
//             paddingBottom: 1,
//             backgroundColor: theme.secondary,
//             color: theme.text,
//         },
//         itemText: {
//             padding: 5,
//             paddingLeft: 20,
//             borderBottomWidth: 1,
//             borderBottomColor: theme.secondary,
//         },
//         itemLabel: {
//             fontSize: 14,
    //         color: theme.text,
    //     },
    //     errorText: {
    //         color: theme.text,
    //         fontSize: 16,
    //     },
    // });