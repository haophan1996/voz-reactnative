import { View, Text, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import fetchHomePage from "./data/services"
import { Link } from 'expo-router';
import createStyles from './theme/stylesheet';
import useThemeMode from './theme/useThemeMode';

// The screen component
export default function Index() {
  const [data, setData] = useState<any>(null); // Store fetched data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state
  const styles = createStyles(useThemeMode());

  const loadData = async () => {
    try {
      const result = await fetchHomePage();
      setData(result);
    } catch (err) {
      console.log(err)
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading == true)
      loadData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <SectionList
        sections={data} // This should be an array of sections, each with a 'data' array
        keyExtractor={(item, index) => item.title + index} // Use item.title for unique key
        renderItem={({ item }) => (
          <Link href={{
            pathname: '/sub_item',
            params: { appbartitle: item.title, linksubitem: item.link }
          }} style={styles.itemText}>
            <Text style={styles.itemTitle}>{item.title} {"\n"}</Text>
            <Text style={styles.itemMeta}>Threads: {item.thread} ● Messages: {item.messages}</Text>
          </Link>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.headerText}>{section.section}</Text> // Access section.section
        )}
      />
    </View>
  );
}
 