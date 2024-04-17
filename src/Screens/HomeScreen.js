import axios from 'axios';
import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput, Button, Pressable } from 'react-native'
import Add from 'react-native-vector-icons/AntDesign'

export default function HomeScreen() {
    const todos = [];
    const [modalVisible, setModalVisible] = useState(false);
    const [todo, setTodo] = useState("");

    const suggestions = [
        {
            id: "0",
            todo: "Drink Water, keep healthy",
        },
        {
            id: "1",
            todo: "Go Excercising",
        },
        {
            id: "2",
            todo: "Go to bed early",
        },
        {
            id: "3",
            todo: "Take pill reminder",
        },
        {
            id: "4",
            todo: "Go Shopping",
        },
        {
            id: "5",
            todo: "finish assignments",
        },
    ];

    const addTodo = async () => {
        try {
            const todoData = {
                title: todo
            }
            axios
                .post("http://162.16.2.190:3000/todos/661eb47db380e37e5a5bb700", todoData)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
            setModalVisible(false);
            setTodo("")
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <View style={{ padding: 8, height: '100%' }}>
            <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold', paddingBottom: 5 }}>Today's Tasks</Text>
            <ScrollView>
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
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: 'absolute', bottom: 15, right: 15 }}>
                <Add name='pluscircle' color='#7CB9E8' size={55} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}

            >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, height: 500 }}>
                        <TextInput
                            placeholder="Add a new task"
                            value={todo}
                            onChangeText={(text) => setTodo(text)}
                            style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginBottom: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: 'blue', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5, marginTop: 10 }} onPress={addTodo}>
                                <Text style={{ color: 'white', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5, marginTop: 10 }} onPress={() => setModalVisible(false)}>
                                <Text style={{ color: 'white', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <Text>Some Suggestions</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginVertical: 10 }}>
                            {
                                suggestions?.map((item, index) => (
                                    <Pressable onPress={() => setTodo(item?.todo)} style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 25, backgroundColor: '#F0F8FF' }} key={index}>
                                        <Text style={{ textAlign: 'center' }}>{item.todo}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}