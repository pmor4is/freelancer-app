import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles/JobsCreateStyle';

export default function JobsCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [payment, setPayment] = useState('');
    const [date, setDate] = useState(new Date());
    const [employer, setEmployer] = useState('');
    const [local, setLocal] = useState('');
    const [hour, setHour] = useState(new Date());
    const [transport, setTransport] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedHour, setSelectedHour] = useState(null); // Armazena a hora selecionada

    const onDayPress = (day) => {
        // Converta a string de data para um objeto Date
        const selectedDateObj = new Date(day.dateString);

        // Ajuste o fuso horário para o fuso horário local
        selectedDateObj.setHours(selectedDateObj.getHours() + (new Date().getTimezoneOffset() / 60));

        setSelectedDate(selectedDateObj);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        setSelectedDate(currentDate);
    };

    const handleHourChange = (event, selectedTime) => {
        const currentTime = selectedTime || hour;
        setShowTimePicker(false);
        setHour(currentTime);
        setSelectedHour(currentTime); // Atualiza a hora selecionada
    };

    const handleSave = () => {
        // Aqui você enviaria os dados para o seu backend
        console.log('Dados do trabalho:', {
            title,
            description,
            payment,
            date,
            employer,
            local,
            hour,
            transport,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Novo Trabalho</Text>
            <TextInput
                style={styles.input}
                placeholder="Título do Trabalho"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição do Trabalho"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Pagamento"
                value={payment}
                onChangeText={setPayment}
            />
            <TextInput
                style={styles.input}
                placeholder="Empregador"
                value={employer}
                onChangeText={setEmployer}
            />
            <TextInput
                style={styles.input}
                placeholder="Local"
                value={local}
                onChangeText={setLocal}
            />
            <View style={styles.dateContainer}>
                <Button title="Selecionar Data" onPress={() => setShowCalendar(true)} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showCalendar}
                    onRequestClose={() => setShowCalendar(false)}
                >
                    <View style={styles.modalContainer}>
                        <Calendar
                            onDayPress={onDayPress}
                            markedDates={{
                                // Use selectedDateObj para marcar a data
                                [selectedDate.toISOString().slice(0, 10)]: { selected: true },
                            }}
                        />
                        <Button title="Fechar" onPress={() => setShowCalendar(false)} />
                    </View>
                </Modal>

            </View>


            <View style={styles.timeContainer}>
                <Button title="Selecionar Hora" onPress={() => setShowTimePicker(!showTimePicker)} />
                {showTimePicker && ( // Mostra o DateTimePicker se showTimePicker for true
                    <DateTimePicker
                        value={hour}
                        mode="time"
                        is24Hour={true}
                        onChange={handleHourChange}
                    />
                )}
            </View>
            {selectedDate && ( // Mostra a data selecionada se houver
                <Text style={styles.selectedHourAndDate}>
                    Data selecionada: {selectedDate.toLocaleDateString()}
                </Text>
            )}
            {selectedHour && ( // Mostra a hora selecionada se houver
                <Text style={styles.selectedHourAndDate}>
                    Hora selecionada: {selectedHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Transporte"
                value={transport}
                onChangeText={setTransport}
            />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};