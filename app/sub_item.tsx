import { View, Text, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSubitem } from './data/services';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Link } from 'expo-router';

export default function subitem() {
    const navigation = useNavigation();
    const { appbartitle, linksubitem } = useLocalSearchParams<{ appbartitle: string, linksubitem: string }>();
    const [data, setdata] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);
    const [error, setError] = useState<any>('')


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
                        <Text style={styles.itemlabel}>{item.label}</Text>
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



const styles = StyleSheet.create({
    itemTitle: {
        alignItems: "center",
        fontSize: 16,
        color: '#007BFF',
    },
    itemMeta: {
        fontSize: 14,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    itemText: {
        padding: 5,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemlabel: {
        color: "#FFCC00"
    }
});
