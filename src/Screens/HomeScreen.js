import axios from 'axios';
import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput, Button, Pressable } from 'react-native'
import Add from 'react-native-vector-icons/AntDesign'
import AddModal from './AddModal';

export default function HomeScreen() {
    const todos = [];
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

    const addTodo = async () => {
        try {
            const todoData = {
                title: title,
                detail: detail
            }
            axios
                .post("http://1162.16.2.55:3000/todos/661eb47db380e37e5a5bb700", todoData)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
            setModalVisible(false);
            setTitle("")
            setDetail("")
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
            <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} addTodo={addTodo} title={title} setTitle={setTitle} detail={detail} setDetail={setDetail} />
        </View>
    )
}