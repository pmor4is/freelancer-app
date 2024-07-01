import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList } from 'react-native';
import Card from '../components/JobCard';

import axios from 'axios';


export default function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://freelancer-app-elephant.vercel.app/jobs'); // Replace with your API endpoint
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header label="Food Central" /> */}
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={jobs}
        renderItem={({ item }) => {
          return <Card info={item} />;
        }}
        keyExtractor={(job) => job.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
});