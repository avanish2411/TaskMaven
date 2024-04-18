import { View, Text } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import {Calendar} from 'react-native-calendars'

export default function CalendarScreen() {
    const today = moment().format("YYYY-MM-DD");
    const [selectedDate,setSelectedDate] = useState (today);

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <Calendar ondayPress={(day)=>setSelectedDate(day.dateString)} />
        </View>
    )
}