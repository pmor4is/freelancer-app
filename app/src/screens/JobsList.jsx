import { Alert, FlatList, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { JobsContext } from '../context/JobsContext';


export default function JobsList(props) {
  const { jobs, getJobs, update, deleteJob } = useContext(JobsContext);
  useEffect(() => {
    getJobs();
  }, [])
  return (
    <SafeAreaView>
      <FlatList
        data={jobs}
        extraData={update}
        keyExtractor={ item => item.id }
        renderItem={ ({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content style={styles.item}>
              <View>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
              </View>
              <View style={{width: 100}}>
                <ListItem.ButtonGroup 
                  buttons={[
                    <Icon name='edit' size={20} color={'blue'} onPress={() => props.navigation.navigate("jobDetail", {item}) } />,
                    <Icon name='trash-can' size={20} color={'red'} onPress={() => deleteJob(item.id)} />
                  ]}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        )}
      >
      </FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  emptyMessage: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  loadingMessage: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
});