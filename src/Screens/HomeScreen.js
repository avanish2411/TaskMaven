import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import Add from 'react-native-vector-icons/AntDesign'

export default function HomeScreen() {
    const todos = [];
    return (
        <View style={{ padding: 8, backgroundColor: 'red', height: '100%' }}>
            <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold',paddingBottom:5 }}>Today's Tasks</Text>
            <ScrollView style={{backgroundColor:'yellow'}}>
                <View>
                    {
                        todos.length > 0 ? (
                            <View>

                            </View>
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '70%' }}>
                                <Image
                                    source={require('../Assets/Images/check-list.png')}
                                    style={{ width: 120, height: 120, resizeMode: 'contain' }}
                                />
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: 600, marginTop: 5 }}>No Tasks are assigned for today</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
            <TouchableOpacity style={{ position: 'absolute', bottom: 15,right:15 }}>
                <Add name='pluscircle' color='#7CB9E8' size={55} />
            </TouchableOpacity>
        </View>
    )
}