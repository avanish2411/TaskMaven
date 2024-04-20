import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Calendar } from 'react-native-calendars'
import moment from 'moment';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function CalendarScreen() {
    const today = moment().format("YYYY-MM-DD");
    const [selectedDate, setSelectedDate] = useState(today);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchCompletedTodos();
    }, [selectedDate]);

    const fetchCompletedTodos = async () => {
        try {
            const response = await axios.get(`http://162.16.2.190:3000/todos/completed/${selectedDate}`);
            const completedTodos = response.date.completedTodos || [];
            setTodos(completedTodos);

        } catch (error) {
            console.log("error", error);
        }
    };

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    console.log(todos);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Calendar
                onDayPress={handleDayPress}
                theme={{
                    todayTextColor:'red',
                    selectedDayTextColor:'white',
                    textMonthFontSize:24,
                    textMonthFontWeight:'900',
                    textDayHeaderFontWeight:'700',
                    textDayHeaderFontSize:14,
                }}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: "green",},
                }}
            />
            <View style={{ marginTop: 20 }} />

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginVertical: 10, marginHorizontal: 10, }}>
                <Text style={{ color: 'black', fontWeight: 600, fontSize: 24 }}>Completed Tasks</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </View>

            {todos?.map((item, index) => (
                <Pressable style={{ backgroundColor: "#E0E0E0", padding: 10, borderRadius: 7, marginVertical: 10, marginHorizontal: 10, }} key={index}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, }}>
                        <FontAwesome name="circle" size={18} color="gray" />
                        <Text style={{ flex: 1, textDecorationLine: "line-through", color: "gray", }}>
                            {item?.title}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}