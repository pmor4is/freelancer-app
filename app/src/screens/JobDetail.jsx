import { View, TextInput, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { JobsContext } from '../context/JobsContext';

export default function JobDetail(props) {

  const { id, title, description, date, hour, setId, setTitle, setDescription, setDate, setHour, saveData } = useContext(JobsContext);

  useEffect(() => {
    console.log(props.route.params.item);
    if (props.route.params.item.id == "") {
      setId("");
      setTitle("");
      setDescription("");
      setDate("");
      setHour("");
      console.log("setou id vazio");
    } else {
      setId(props.route.params.item.id.toString());
      setTitle(props.route.params.item.title);
      setDescription(props.route.params.item.description);
      setDate(props.route.params.item.date ? props.route.params.item.date.toString() : "");
      setHour(props.route.params.item.hour ? props.route.params.item.hour.toString() : "");
      console.log("setou id");
    }
  }, [])

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        editable={false}
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'black',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Nome:'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}

        placeholder='Email:'
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Altura:'
        value={date}
        onChangeText={setDate}
        keyboardType='numeric'
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 5,
        }}
        placeholder='Peso:'
        value={hour}
        onChangeText={setHour}
        keyboardType='numeric'
      />
      <Button
        title="Cancelar"
        color={'#b3bf09'}
        onPress={() => props.navigation.goBack()} />
      <Button
        title="Gravar"
        color="#34bf09"
        onPress={() => { saveData(); props.navigation.goBack() }} />
    </View>
  )
}