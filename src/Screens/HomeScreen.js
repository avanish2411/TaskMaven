import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native'
import Add from 'react-native-vector-icons/AntDesign';
import AddModal from './AddModal';
import Check from 'react-native-vector-icons/Feather';

export default function HomeScreen() {
    const [todos, setTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [pendingTodos, setPendingTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [marked, setMarked] = useState(false);

    const addTodo = async () => {
        try {
            const todoData = {
                title: title,
                detail: detail
            }
            axios
                .post(`http://162.16.1.8:3000/todos/665aec991e83b3620ad38a35`, todoData)
                .then((response) => {
                    getUserTodos();
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

    useEffect(() => {
        getUserTodos();
    }, [marked]);

    const getUserTodos = async () => {
        try {
            const response = await axios.get(
                `http://162.16.1.8:3000/users/665aec991e83b3620ad38a35/todos`
            );
            setTodos(response.data.todos);

            const fetchedTodos = response.data.todos || [];
            const pending = fetchedTodos.filter(
                (todo) => todo.status !== "completed"
            );
            const completed = fetchedTodos.filter(
                (todo) => todo.status === "completed"
            );
            setPendingTodos(pending);
            setCompletedTodos(completed);
        } catch (error) {
            console.log("error", error);
        }
    };

    const markedTodoAsCompleted = async (todoId) => {
        try {
            setMarked(true);
            const response = await axios.patch(`http://162.16.1.8:3000/todos/${todoId}/complete`);
            console.log(response.data);
            getUserTodos();
        } catch (error) {
            console.log("error", error);
        }
    };

    console.log("CompletedTodos: ", completedTodos);
    console.log("PendingTodos: ", pendingTodos);


    return (
        <View style={{ padding: 8, height: '100%' }}>
            <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold', paddingBottom: 5 }}>Today's Tasks</Text>
            <ScrollView>
                <View>
                    {
                        todos?.length > 0 ? (
                            <View>
                                {pendingTodos?.map((item, index) => (
                                    <Pressable key={index} onPress={() => markedTodoAsCompleted(item._id)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, backgroundColor: '#7CB9E8', padding: 8, borderRadius: 15 }}>
                                        <View>
                                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{item?.title}</Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>{item?.detail}</Text>
                                        </View>
                                        <Check name='check-circle' color='#000' size={25} style={{ marginLeft: 'auto' }} />
                                    </Pressable>
                                ))}
                                {completedTodos.length > 0 && <View style={{ marginTop: 15 }}><Text style={{ color: 'black', fontSize: 22 }}>CompletedTodos</Text></View>}
                                {completedTodos?.map((item, index) => (
                                    <Pressable key={index} onPress={() => markedTodoAsCompleted(item._id)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, backgroundColor: '#7CB9E8', padding: 8, borderRadius: 15 }}>
                                        <View>
                                            <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'bold', textDecorationLine: "line-through" }}>{item?.title}</Text>
                                            <Text style={{ color: 'gray', fontSize: 16, textDecorationLine: "line-through" }}>{item?.detail}</Text>
                                        </View>
                                    </Pressable>
                                ))}
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